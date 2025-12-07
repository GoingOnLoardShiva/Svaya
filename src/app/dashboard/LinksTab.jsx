"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SiReacthookform, SiGoogleforms } from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState("Link");

  // Step control
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  // FIXED STATES
  const [loading, setLoading] = useState(false);
  const [manualData, setManualData] = useState(null);

  // When user clicks any item
  const handleSelect = (item) => {
    setSelectedOption(item);
    setStep(2);
  };

  const [userid, setUserId] = useState("");

  //get userdetails form localstorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("usertoken_details"));
    if (userData) {
      setUserId(userData.userId);
    }
  }, []);

  // Fetch data from API when Manual button clicked
  const handleManual = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/user/get-link-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: selectedOption.title,
          id:userid,
        }),
      });

      const data = await res.json();
      setManualData(data);
      setStep(3);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      title: "Facebook",
      icon: FaFacebook,
      color: "text-blue-500",
      bg: "bg-blue-500",
    },
    {
      title: "Instagram",
      icon: FaInstagram,
      color: "text-pink-500",
      bg: "bg-pink-500",
    },
    {
      title: "Youtube",
      icon: FaYoutube,
      color: "text-red-500",
      bg: "bg-red-500",
    },
  ];

  const formOptions = [
    { title: "Email", icon: MdOutlineMail, color: "text-black" },
    { title: "Google Form", icon: SiGoogleforms, color: "text-blue-500" },
    { title: "Custom Form", icon: SiReacthookform, color: "text-red-500" },
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <Tabs defaultValue="Link" onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white/70 backdrop-blur-md rounded-xl flex gap-2 p-2 shadow-sm border">
          <TabsTrigger value="Link" className="flex-1">
            Links
          </TabsTrigger>
          <TabsTrigger value="Form" className="flex-1">
            Forms
          </TabsTrigger>
        </TabsList>

        {/* ------------------- LINK TAB ------------------- */}
        <TabsContent value="Link">
          <Card className="mt-4 border rounded-xl">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Social Links</CardTitle>

              {(step === 2 || step === 3) && (
                <div className="flex justify-end">
                  <button
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-black transition"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                    <IoIosArrowForward size={18} className="rotate-180" />
                  </button>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {/* STEP 1 → Select platform */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="grid gap-4"
                  >
                    {socialLinks.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          onClick={() => handleSelect(item)}
                          className="flex items-center gap-2 p-4 rounded-full shadow hover:scale-[1.02] transition border cursor-pointer"
                        >
                          <Icon className={`w-5 h-5 ${item.color}`} />
                          <Label className="flex-1">{item.title}</Label>
                          <IoIosArrowForward />
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {/* STEP 2 → Manual + Connect buttons */}
                {step === 2 && selectedOption && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="flex gap-8">
                      <Button
                        onClick={handleManual}
                        className="mt-4 w-fit rounded-full border"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Manual"}
                      </Button>

                      <Button
                        className={`mt-4 w-fit rounded-full ${selectedOption.bg} text-white hover:scale-[1.05]`}
                      >
                        Connect {selectedOption.title}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 → Manual Fetched Data */}
                {step === 3 && manualData && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <h2 className="text-lg font-semibold">
                      {selectedOption.title} Data
                    </h2>

                    <div className="grid gap-3">
                      <Label>Title</Label>
                      <Input value={manualData.title} readOnly />

                      <Label>Link</Label>
                      <Input value={manualData.link} readOnly />

                      <Label>Logo</Label>
                      <Input value={manualData.logo} readOnly />

                      <Label>Clicks</Label>
                      <Input value={manualData.clicks} readOnly />

                      <Label>Status</Label>
                      <Input
                        value={manualData.isActive ? "Active" : "Inactive"}
                        readOnly
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ------------------- FORM TAB ------------------- */}
        <TabsContent value="Form">
          <Card className="mt-4 border rounded-xl">
            <CardHeader>
              <CardTitle>Select a Form Type</CardTitle>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="form-step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="grid gap-4"
                  >
                    {formOptions.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          onClick={() => handleSelect(item)}
                          className="flex items-center gap-2 p-4 rounded-full shadow hover:scale-[1.02] transition border cursor-pointer"
                        >
                          <Icon className={`w-5 h-5 ${item.color}`} />
                          <Label className="flex-1">{item.title}</Label>
                          <IoIosArrowForward />
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {step === 2 && selectedOption && (
                  <motion.div
                    key="form-step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <button
                      className="flex items-center gap-2 text-sm text-gray-600"
                      onClick={() => setStep(1)}
                    >
                      <IoIosArrowBack size={18} /> Back
                    </button>

                    <h2 className="text-xl font-semibold">
                      {selectedOption.title} Information
                    </h2>

                    <div className="grid gap-3">
                      <Label>Your Input</Label>
                      <Input placeholder="Type your details..." />
                      <Button className="mt-4 w-full">Save Form</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
