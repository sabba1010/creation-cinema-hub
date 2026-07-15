import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Image as ImageIcon,
  Save,
  Film,
  CalendarDays,
  Home,
  Eye,
  EyeOff,
  Type,
  Video,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

const API_URL = "https://movie-backend-drab.vercel.app";

export const Route = createFileRoute("/admin/settings")({
  component: SiteSettings,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isVimeoUrl(url: string) {
  return /vimeo\.com\/(\d+)/i.test(url);
}
function getVimeoId(url: string) {
  const m = url.match(/vimeo\.com\/(\d+)/i);
  return m ? m[1] : null;
}
function isVideoFile(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}

// ─── Mini Preview Component ────────────────────────────────────────────────
function MediaPreview({ url, label }: { url: string; label: string }) {
  if (!url) return null;
  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return (
      <div className="mt-3 rounded-2xl overflow-hidden border border-border/50 bg-muted aspect-video relative">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&controls=1`}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title={label}
        />
      </div>
    );
  }
  if (isVideoFile(url)) {
    return (
      <div className="mt-3 rounded-2xl overflow-hidden border border-border/50 bg-muted aspect-video relative">
        <video src={url} controls className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="mt-3 rounded-2xl overflow-hidden border border-border/50 bg-muted aspect-video relative">
      <img src={url} alt={label} className="w-full h-full object-cover" />
    </div>
  );
}

// ─── Save helper ──────────────────────────────────────────────────────────────
async function saveSetting(key: string, value: string) {
  const res = await fetch(`${API_URL}/api/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) throw new Error("Failed");
}

// ─── Section Card ─────────────────────────────────────────────────────────────
interface Field { key: string; label: string; placeholder: string; hint?: string; icon?: React.ReactNode; }

function SettingSection({
  icon,
  title,
  description,
  fields,
  values,
  onChange,
  onSave,
  saving,
  previewKey,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  fields: Field[];
  values: Record<string, string>;
  onChange: (key: string, val: string) => void;
  onSave: () => void;
  saving: boolean;
  previewKey?: string;
}) {
  const [showPreview, setShowPreview] = useState(true);
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-display flex items-center gap-2">
              {icon}
              {title}
            </CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <Button
            size="sm"
            onClick={onSave}
            disabled={saving}
            className="bg-forest h-9 rounded-xl gap-2 shadow-md hover:shadow-forest/20 transition-all shrink-0"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-sm">
              {f.icon}
              {f.label}
            </Label>
            <Input
              value={values[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="h-10 rounded-xl font-mono text-sm"
            />
            {f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
          </div>
        ))}

        {/* Preview toggle */}
        {previewKey && values[previewKey] && (
          <div>
            <button
              onClick={() => setShowPreview((p) => !p)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? "Hide preview" : "Show preview"}
            </button>
            {showPreview && (
              <MediaPreview url={values[previewKey]} label={title} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function SiteSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [sectionSaving, setSectionSaving] = useState<Record<string, boolean>>({});
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});

  const [vals, setVals] = useState<Record<string, string>>({
    home_hero_media: "",
    home_hero_title: "",
    home_hero_subtitle: "",
    films_hero_vimeo: "",
    films_hero_title: "",
    events_hero_vimeo: "",
    events_hero_title: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/settings`);
        const data = await res.json();
        if (data.success) {
          setVals((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(data.data as Record<string, string>).map(([k, v]) => [k, v ?? ""])
            ),
          }));
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (key: string, value: string) => {
    setVals((prev) => ({ ...prev, [key]: value }));
  };

  const handleSectionSave = async (sectionId: string, keys: string[]) => {
    setSectionSaving((p) => ({ ...p, [sectionId]: true }));
    try {
      await Promise.all(keys.map((k) => saveSetting(k, vals[k] || "")));
      toast.success(`${sectionId} settings saved!`);
      setSavedKeys((p) => ({ ...p, ...Object.fromEntries(keys.map((k) => [k, true])) }));
      setTimeout(() => setSavedKeys((p) => ({ ...p, ...Object.fromEntries(keys.map((k) => [k, false])) })), 2000);
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSectionSaving((p) => ({ ...p, [sectionId]: false }));
    }
  };

  const handleSaveAll = async () => {
    setIsSavingAll(true);
    try {
      await Promise.all(Object.keys(vals).map((k) => saveSetting(k, vals[k] || "")));
      toast.success("All settings saved successfully!");
    } catch {
      toast.error("Some settings failed to save");
    } finally {
      setIsSavingAll(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-up pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="w-7 h-7 text-forest" />
            Site Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage hero banners, videos, and titles for each page.
          </p>
        </div>
        <Button
          className="bg-forest h-11 rounded-xl gap-2 shadow-md hover:shadow-forest/20 transition-all"
          onClick={handleSaveAll}
          disabled={isSavingAll}
        >
          {isSavingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All Changes
        </Button>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-forest/20 bg-forest/5 px-5 py-4">
        <CheckCircle2 className="w-5 h-5 text-forest shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-foreground">Vimeo Link Format</p>
          <p className="text-muted-foreground mt-0.5">
            Use the format <code className="bg-muted px-1 rounded text-xs">https://vimeo.com/VIDEO_ID</code> for Vimeo links.
            Direct mp4 links or image URLs are also supported.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Home Page */}
        <SettingSection
          icon={<Home className="w-5 h-5 text-forest" />}
          title="Home Page Hero"
          description="Set the background media and text for the Home page hero section."
          fields={[
            {
              key: "home_hero_media",
              label: "Background Image / Video URL",
              placeholder: "https://vimeo.com/123456789  or  https://example.com/image.jpg",
              hint: "Enter a Vimeo link, direct mp4, or image URL. Leave empty to use the default image.",
              icon: <Video className="w-3.5 h-3.5" />,
            },
            {
              key: "home_hero_title",
              label: "Hero Main Title",
              placeholder: "Wonder. Explore. Belong.",
              hint: "Leave empty to use the default title.",
              icon: <Type className="w-3.5 h-3.5" />,
            },
            {
              key: "home_hero_subtitle",
              label: "Hero Subtitle (Badge Text)",
              placeholder: "A faith-centered media ministry",
              hint: "The small badge text displayed above the hero title.",
              icon: <Type className="w-3.5 h-3.5" />,
            },
          ]}
          values={vals}
          onChange={handleChange}
          onSave={() => handleSectionSave("Home", ["home_hero_media", "home_hero_title", "home_hero_subtitle"])}
          saving={!!sectionSaving["Home"]}
          previewKey="home_hero_media"
        />

        {/* Films Page */}
        <SettingSection
          icon={<Film className="w-5 h-5 text-gold" />}
          title="Films Page Banner"
          description="Set the fallback hero banner video for the Films page when no Hero Slider is active."
          fields={[
            {
              key: "films_hero_vimeo",
              label: "Vimeo / Video URL",
              placeholder: "https://vimeo.com/1209490802",
              hint: "Vimeo link or direct mp4 URL. If a Hero Slider is active in the Films admin, it takes priority.",
              icon: <Video className="w-3.5 h-3.5" />,
            },
            {
              key: "films_hero_title",
              label: "Fallback Hero Subtitle Text",
              placeholder: "Explore the official library of original productions.",
              hint: "Displayed as the fallback description text when no Hero Slider is active.",
              icon: <Type className="w-3.5 h-3.5" />,
            },
          ]}
          values={vals}
          onChange={handleChange}
          onSave={() => handleSectionSave("Films", ["films_hero_vimeo", "films_hero_title"])}
          saving={!!sectionSaving["Films"]}
          previewKey="films_hero_vimeo"
        />

        {/* Events Page */}
        <SettingSection
          icon={<CalendarDays className="w-5 h-5 text-amber-500" />}
          title="Events Page Hero"
          description="Set the background video and title for the Events page hero section."
          fields={[
            {
              key: "events_hero_vimeo",
              label: "Hero Video URL (Vimeo / mp4)",
              placeholder: "https://vimeo.com/123456789  or  https://example.com/video.mp4",
              hint: "Vimeo links use an iframe player. Direct mp4 links use a native video element.",
              icon: <Video className="w-3.5 h-3.5" />,
            },
            {
              key: "events_hero_title",
              label: "Hero Title",
              placeholder: "Live Events",
              hint: "The main hero title. Leave empty to use the dynamic Live/Past Events label.",
              icon: <Type className="w-3.5 h-3.5" />,
            },
          ]}
          values={vals}
          onChange={handleChange}
          onSave={() => handleSectionSave("Events", ["events_hero_vimeo", "events_hero_title"])}
          saving={!!sectionSaving["Events"]}
          previewKey="events_hero_vimeo"
        />

        {/* Quick Reference */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-display flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
              Quick Reference
            </CardTitle>
            <CardDescription>All available settings keys and their purpose.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { key: "home_hero_media", page: "Home", desc: "Background image/video" },
                { key: "home_hero_title", page: "Home", desc: "Hero main title" },
                { key: "home_hero_subtitle", page: "Home", desc: "Hero subtitle badge" },
                { key: "films_hero_vimeo", page: "Films", desc: "Fallback banner video" },
                { key: "films_hero_title", page: "Films", desc: "Fallback description text" },
                { key: "events_hero_vimeo", page: "Events", desc: "Hero background video" },
                { key: "events_hero_title", page: "Events", desc: "Hero title text" },
              ].map((item) => (
                <div key={item.key} className="flex items-start gap-3 text-sm">
                  <code className="bg-muted text-xs px-2 py-0.5 rounded font-mono shrink-0">{item.key}</code>
                  <div className="text-muted-foreground">
                    <span className="font-medium text-foreground">{item.page}: </span>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
