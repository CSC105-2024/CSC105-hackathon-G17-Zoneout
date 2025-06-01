import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { LocateFixed, Ghost } from "lucide-react";
import { createRoot } from "react-dom/client";
import { getPosts } from "@/api/post";
import { toast } from "sonner";
import PostModal from "./PostModal";
import { Axios } from "@/../axiosInstance";
import { useNavigate } from "react-router-dom";

const iconToSVG = (IconComponent: any): Promise<string> => {
  return new Promise((resolve) => {
    // Create a temporary div
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);

    // Create a root and render the icon
    const root = createRoot(tempDiv);
    root.render(
      <IconComponent
        size={24}
        strokeWidth={2}
        stroke="currentColor"
        fill="none"
      />
    );
    setTimeout(() => {
      const svgElement = tempDiv.querySelector("svg");
      if (svgElement) {
        const innerHTML = svgElement.innerHTML;
        resolve(innerHTML);
      } else {
        resolve('<circle cx="12" cy="12" r="8" />');
      }
      root.unmount();
      document.body.removeChild(tempDiv);
    }, 10);
  });
};

const iconMap: { [key: string]: any } = {
  Ghost,
};

type Post = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  icon: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
    id: number;
  };
};

// Helper function to calculate distance between two points in kilometers
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const NEARBY_RADIUS_KM = 5; // Show posts within 5km radius
type InteractiveMapProps = {
  onMarkerClick?: (post: Post) => void;
  refreshTrigger?: number;
  isLoaded: boolean;
};
const InteractiveMap = ({
  onMarkerClick,
  refreshTrigger = 0,
  isLoaded,
}: InteractiveMapProps) => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [iconSVGs, setIconSVGs] = useState<{ [key: string]: string }>({});
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [nearbyPosts, setNearbyPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch all posts when component mounts or refreshTrigger changes
  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await getPosts();
        if (response.success) {
          // Transform backend post format to frontend format
          const transformedPosts = response.data.map((post: any) => ({
            id: post.id,
            title: post.content.split("\n")[0], // First line as title
            description: post.content,
            category: post.category,
            location: `${post.latitude}, ${post.longitude}`,
            icon: post.icon || "Ghost",
            user: post.user
              ? {
                  name: post.user.name,
                  email: post.user.email,
                  phone: post.user.phone,
                  id: post.user.id,
                }
              : undefined,
          }));
          setAllPosts(transformedPosts);
          console.log("Posts updated:", transformedPosts); // Debug log
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [refreshTrigger]); // Add refreshTrigger as a dependency

  // Update nearby posts when user location or allPosts changes
  useEffect(() => {
    if (userLocation && allPosts.length > 0) {
      const nearby = allPosts.filter((post) => {
        const [postLat, postLng] = post.location.split(",").map(Number);
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          postLat,
          postLng
        );
        return distance <= NEARBY_RADIUS_KM;
      });
      setNearbyPosts(nearby);
      console.log("Nearby posts updated:", nearby); // Debug log
    }
  }, [userLocation, allPosts]);

  // Force a re-render when refreshTrigger changes
  useEffect(() => {
    console.log("Refresh trigger changed:", refreshTrigger); // Debug log
  }, [refreshTrigger]);

  // Pre-generate SVG strings for all icons
  useEffect(() => {
    const generateIconSVGs = async () => {
      const svgs: { [key: string]: string } = {};

      for (const [key, IconComponent] of Object.entries(iconMap)) {
        try {
          svgs[key] = await iconToSVG(IconComponent);
        } catch (error) {
          console.warn(`Failed to generate SVG for ${key}:`, error);
          svgs[key] = '<circle cx="12" cy="12" r="8" />'; // Fallback
        }
      }

      setIconSVGs(svgs);
    };

    if (isLoaded) {
      generateIconSVGs();
    }
  }, [isLoaded]);

  // Track user location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => console.error(err)
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Center map on user location when available
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.panTo(userLocation);
    }
  }, [userLocation]);

  const handleMarkerClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    if (onMarkerClick) {
      onMarkerClick(post);
    }
  };

  const handleViewProfile = () => {
    if (selectedPost?.user?.id) {
      navigate(`/profile/${selectedPost.user.id}`);
    }
  };

  const handleJoin = () => {
    console.log("Join activity:", selectedPost?.title);
  };

  const handleDelete = async (postId: number) => {
    try {
      const response = await Axios.delete(`/api/posts/delete-post/${postId}`);
      if (response.data.success) {
        setAllPosts((prev) => prev.filter((post) => post.id !== postId));
        toast.success("Post deleted successfully!");
        setIsModalOpen(false);
      } else {
        toast.error(response.data.msg || "Failed to delete post");
      }
    } catch (error) {
      toast.error(`This is ${selectedPost?.user?.name}'s post.`);
      console.error(error);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-white/50 rounded-2xl">
        Loading map...
      </div>
    );
  }

  // Helper to parse 'lat, lng' string
  const parseLatLng = (loc: string) => {
    const [lat, lng] = loc.split(",").map(Number);
    return { lat, lng };
  };

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        center={userLocation || { lat: 1.3521, lng: 103.8198 }}
        zoom={zoom}
        mapContainerClassName="w-full h-full rounded-2xl"
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{ disableDefaultUI: true, zoomControl: false }}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="12" fill="#4285f4" stroke="#ffffff" stroke-width="3"/>
                  <circle cx="15" cy="15" r="4" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(30, 30),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        )}

        {/* Nearby post markers */}
        {nearbyPosts.map((post, idx) => {
          const pos = parseLatLng(post.location);
          const iconContent =
            iconSVGs[post.icon] ||
            iconSVGs.Ghost ||
            '<circle cx="12" cy="12" r="8" />';

          return (
            <Marker
              onClick={() => handleMarkerClick(post)}
              key={idx}
              position={pos}
              icon={{
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                  <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
                    <g transform="translate(12,12)">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${iconContent}
                      </svg>
                    </g>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(48, 48),
                anchor: new window.google.maps.Point(24, 24),
              }}
            />
          );
        })}
      </GoogleMap>

      {/* Post Modal */}
      <PostModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={selectedPost}
        onViewProfile={handleViewProfile}
        onJoin={handleJoin}
        onDelete={
          selectedPost ? () => handleDelete(Number(selectedPost.id)) : undefined
        }
      />

      {/* Nearby posts counter */}
      <div className="absolute top-4 left-4 bg-white/80 px-4 py-2 rounded-full shadow-md">
        <span className="font-medium">{nearbyPosts.length} posts nearby</span>
      </div>

      {/* Zoom and locate controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button
          className="w-10 h-10 rounded-full bg-white/80 text-2xl font-bold shadow hover:bg-white transition"
          onClick={() => setZoom((z) => Math.min(z + 1, 21))}
        >
          +
        </button>
        <button
          className="w-10 h-10 rounded-full bg-white/80 text-2xl font-bold shadow hover:bg-white transition"
          onClick={() => setZoom((z) => Math.max(z - 1, 1))}
        >
          -
        </button>
        <button
          className="w-10 h-10 rounded-full bg-white/80 text-xl shadow hover:bg-white transition flex items-center justify-center"
          title="Center on my location"
          onClick={() => {
            if (userLocation && mapRef.current) {
              mapRef.current.panTo(userLocation);
              setZoom(17);
            }
          }}
        >
          <LocateFixed className="w-6 h-6 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;
