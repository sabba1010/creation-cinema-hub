import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Image as ImageIcon,
  Save
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SiteSettings,
});

function SiteSettings() {
  const [heroImage, setHeroImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        const data = await res.json();
        if (data.success && data.data.home_hero_media) {
          setHeroImage(data.data.home_hero_media);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "home_hero_media", value: heroImage }),
      });
      if (res.ok) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading settings...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Site Settings</h1>
          <p className="text-muted-foreground">Manage global configuration and media for the website.</p>
        </div>
        <Button className="bg-forest h-11 rounded-xl gap-2 shadow-md hover:shadow-forest/20 transition-all" onClick={handleSave}>
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-forest" />
              Home Page Hero Section
            </CardTitle>
            <CardDescription>Update the main background image or video URL for the Home page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hero Image/Video URL</Label>
              <Input
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-11 rounded-xl"
              />
              <p className="text-xs text-muted-foreground">Leave empty to use the default image.</p>
            </div>
            {heroImage && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-border/50 bg-muted aspect-video relative">
                {heroImage.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={heroImage} autoPlay loop muted playsInline className="object-cover w-full h-full" />
                ) : (
                  <img src={heroImage} alt="Hero Preview" className="object-cover w-full h-full" />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
