"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

export default function Page() {
  const [apps, setApps] = useState([]);
  const [type, setType] = useState("link");
   const [userid, setuserid] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    logo: "",
    link: "",
    file: "",
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usertoken_details"));
    if (userData) {
      setuserid(userData.userId);
    }
  }, []);

  // ✅ Fetch apps
  //   useEffect(() => {
  //     fetch("/api/apps")
  //       .then((res) => res.json())
  //       .then(setApps);
  //   }, []);

  // ✅ Submit
  async function submitApp() {
    const res = await fetch("/api/user/app-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type,uuid:userid }),
    });

    const data = await res.json();
    if (data.success) {
      setApps((prev) => [data.app, ...prev]);
      setForm({ name: "", description: "", logo: "", link: "", file: "" });
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 p-6">
      {/* ✅ Add App */}
      <Card>
        <CardHeader>
          <CardTitle>Add New App</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="App Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Textarea
            placeholder="App Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Input
            placeholder="App Logo URL"
            value={form.logo}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
          />

          {/* ✅ Select Upload Type */}
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="link">Official App Link</SelectItem>
              <SelectItem value="file">Manual File Upload</SelectItem>
            </SelectContent>
          </Select>

          {/* ✅ Conditional Input */}
          {type === "link" ? (
            <Input
              placeholder="Official App Link (Play Store / Website)"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
          ) : (
            <Input
              placeholder="Uploaded File URL (APK / ZIP / EXE)"
              value={form.file}
              onChange={(e) => setForm({ ...form, file: e.target.value })}
            />
          )}

          <Button onClick={submitApp} className="w-full">
            Save App
          </Button>
        </CardContent>
      </Card>

      {/* ✅ App List */}
      <div className="grid sm:grid-cols-2 gap-6">
        {apps.map((app) => (
          <Card key={app._id}>
            <CardContent className="p-4 space-y-3">
              <img
                src={app.logo || "/placeholder.png"}
                className="w-16 h-16 rounded"
                alt={app.name}
              />
              <h3 className="font-semibold">{app.name}</h3>
              <p className="text-sm text-muted-foreground">{app.description}</p>

              {app.type === "link" ? (
                <a href={app.link} target="_blank">
                  <Button className="w-full">Visit Official Site</Button>
                </a>
              ) : (
                <a href={app.file} download>
                  <Button className="w-full">Download App</Button>
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
