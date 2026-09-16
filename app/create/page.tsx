"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [loveDate, setLoveDate] = useState("");
  const [firstMetDate, setFirstMetDate] = useState("");
  const [firstMetText, setFirstMetText] = useState("");
  const [specialMomentText, setSpecialMomentText] = useState("");
  const [secretMessage, setSecretMessage] = useState("");
  const [quizQ1, setQuizQ1] = useState("");
  const [quizA1, setQuizA1] = useState("");
  const [quizQ2, setQuizQ2] = useState("");
  const [quizA2, setQuizA2] = useState("");
  const [quizQ3, setQuizQ3] = useState("");
  const [quizA3, setQuizA3] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [step, setStep] = useState(1);
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handlePhotos = (files: FileList | null) => {
    if (!files) return;

    const selected = Array.from(files).slice(0, 6);
    const previews = selected.map((file) => URL.createObjectURL(file));

    setPhotoFiles(selected);
    setPhotos(previews);
  };

  const inputClass =
    "w-full rounded-2xl border border-black/10 bg-[#fffaf7] px-5 py-4 text-base outline-none transition placeholder:text-[#9b8f92] focus:border-[#e85d75] focus:bg-white focus:ring-4 focus:ring-[#e85d75]/10";

  const cardClass =
    "rounded-[32px] border border-white/80 bg-white/85 p-7 shadow-[0_25px_80px_rgba(36,27,29,0.10)] backdrop-blur-xl sm:p-12";

  const nextStep = (target: number) => {
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf7] text-[#241b1d]">
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute -right-32 top-72 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-200/20 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#fffaf7]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-5xl items-center justify-between px-5 sm:px-6">
          <a
            href="/"
            className="text-2xl font-extrabold tracking-tight transition hover:opacity-80"
          >
            Gitu<span className="text-[#e85d75]">Love</span>
          </a>

          <div className="hidden items-center gap-2 text-sm font-medium text-[#75696c] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#e85d75]" />
            Create your surprise
            <span>❤️</span>
          </div>

          <a
            href="/"
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold transition hover:bg-white"
          >
            Exit
          </a>
        </div>
      </header>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {/* TOP INTRO */}
          <div className="mb-8 text-center sm:mb-10">
            <p className="mb-3 text-sm font-semibold tracking-wide text-[#e85d75]">
              ✨ MAKE A MOMENT THEY'LL REMEMBER
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Create something beautiful.
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#75696c] sm:text-base">
              A few simple details, one unforgettable surprise. ❤️
            </p>
          </div>

          {/* PROGRESS */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between px-1 text-xs font-semibold text-[#75696c]">
              <span>Step {step} of 4</span>

              <span>
                {step === 1 && "The basics"}
                {step === 2 && "Your story"}
                {step === 3 && "Your memories"}
                {step === 4 && "Final preview"}
              </span>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4].map((number) => (
                <div
                  key={number}
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    step >= number
                      ? "bg-[#e85d75] shadow-[0_3px_12px_rgba(232,93,117,0.35)]"
                      : "bg-black/10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className={cardClass}>
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#fff0f3] to-[#ffe4ea] text-4xl shadow-[0_10px_30px_rgba(232,93,117,0.15)]">
                  💌
                </div>

                <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Who is this surprise for?
                </h2>

                <p className="mt-3 text-[#75696c]">
                  Let's start with something simple.
                </p>
              </div>

              <div className="mt-10 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Their name
                  </label>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter their name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Your name
                  </label>

                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </div>

                <button
  type="button"
                  onClick={() => {
                    if (name.trim() && from.trim()) {
                      nextStep(2);
                    } else {
                      alert("Please enter both names.");
                    }
                  }}
                  className="group w-full rounded-full bg-[#241b1d] px-6 py-4 font-bold text-white shadow-[0_12px_25px_rgba(36,27,29,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e85d75] hover:shadow-[0_15px_30px_rgba(232,93,117,0.25)]"
                >
                  Continue
                  <span className="ml-2 transition group-hover:translate-x-1 inline-block">
                    →
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className={cardClass}>
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#fff0f3] to-[#ffe4ea] text-4xl shadow-[0_10px_30px_rgba(232,93,117,0.15)]">
                  💖
                </div>

                <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Write something special
                </h2>

                <p className="mt-3 text-[#75696c]">
                  Tell {name || "them"} what they mean to you.
                </p>
              </div>

              <div className="mt-10">
                <label className="mb-2 block text-sm font-bold">
                  Your message ❤️
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={7}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="mt-7 rounded-3xl border border-[#e85d75]/10 bg-[#fffaf7]/70 p-5 sm:p-6">
                <div className="mb-5">
                  <p className="text-base font-bold">Your love story ✨</p>
                  <p className="mt-1 text-sm text-[#75696c]">
                    Add a few memories to make the surprise more personal.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Our special date ❤️
                    </label>

                    <input
                      type="date"
                      value={loveDate}
                      onChange={(e) => setLoveDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      When did you first meet? 💕
                    </label>

                    <input
                      type="date"
                      value={firstMetDate}
                      onChange={(e) => setFirstMetDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      First meeting memory ✨
                    </label>

                    <input
                      type="text"
                      value={firstMetText}
                      onChange={(e) => setFirstMetText(e.target.value)}
                      placeholder="e.g. The day we first met ❤️"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Special moment 💖
                    </label>

                    <input
                      type="text"
                      value={specialMomentText}
                      onChange={(e) => setSpecialMomentText(e.target.value)}
                      placeholder="e.g. Our most beautiful memory"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7 rounded-3xl border border-[#e85d75]/10 bg-white/70 p-5 sm:p-6">
                <label className="mb-2 block text-sm font-bold">
                  Secret message 🤫❤️
                </label>

                <p className="mb-4 text-sm text-[#75696c]">
                  Something they can discover later...
                </p>

                <textarea
                  value={secretMessage}
                  onChange={(e) => setSecretMessage(e.target.value)}
                  placeholder="Write something only they should discover..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* LOVE QUIZ */}
              <div className="mt-7 rounded-3xl border border-[#e85d75]/10 bg-gradient-to-br from-[#fff7f9] to-white p-5 sm:p-6">
                <div className="mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fff0f3]">
                      💘
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold">
                        Love Quiz
                      </h3>
                      <p className="text-xs text-[#75696c]">
                        Test how well they know you.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <label className="mb-2 block text-sm font-bold">
                      Question 1
                    </label>

                    <input
                      type="text"
                      value={quizQ1}
                      onChange={(e) => setQuizQ1(e.target.value)}
                      placeholder="e.g. Where did we first meet?"
                      className={inputClass}
                    />

                    <label className="mb-2 mt-4 block text-sm font-semibold">
                      Answer 1
                    </label>

                    <input
                      type="text"
                      value={quizA1}
                      onChange={(e) => setQuizA1(e.target.value)}
                      placeholder="Correct answer"
                      className={inputClass}
                    />
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <label className="mb-2 block text-sm font-bold">
                      Question 2
                    </label>

                    <input
                      type="text"
                      value={quizQ2}
                      onChange={(e) => setQuizQ2(e.target.value)}
                      placeholder="e.g. What is my favourite memory?"
                      className={inputClass}
                    />

                    <label className="mb-2 mt-4 block text-sm font-semibold">
                      Answer 2
                    </label>

                    <input
                      type="text"
                      value={quizA2}
                      onChange={(e) => setQuizA2(e.target.value)}
                      placeholder="Correct answer"
                      className={inputClass}
                    />
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <label className="mb-2 block text-sm font-bold">
                      Question 3
                    </label>

                    <input
                      type="text"
                      value={quizQ3}
                      onChange={(e) => setQuizQ3(e.target.value)}
                      placeholder="e.g. What do I call you?"
                      className={inputClass}
                    />

                    <label className="mb-2 mt-4 block text-sm font-semibold">
                      Answer 3
                    </label>

                    <input
                      type="text"
                      value={quizA3}
                      onChange={(e) => setQuizA3(e.target.value)}
                      placeholder="Correct answer"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* THEME */}
              <div className="mt-7">
                <label className="mb-3 block text-sm font-bold">
                  Choose a theme ❤️
                </label>

                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={inputClass}
                >
                  <option value="romantic">💕 Romantic Pink</option>
                  <option value="dark">🌙 Dark Love</option>
                  <option value="rose">🌹 Rose</option>
                  <option value="elegant">✨ Elegant</option>
                </select>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => nextStep(1)}
                  className="rounded-full border border-black/10 bg-white px-6 py-4 font-bold transition hover:bg-[#fffaf7]"
                >
                  ← Back
                </button>

                <button
                  onClick={() => {
                    if (message.trim()) {
                      nextStep(3);
                    } else {
                      alert("Please write a message.");
                    }
                  }}
                  className="group flex-1 rounded-full bg-[#241b1d] px-6 py-4 font-bold text-white shadow-[0_12px_25px_rgba(36,27,29,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e85d75]"
                >
                  Add photos
                  <span className="ml-2 inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className={cardClass}>
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#fff0f3] to-[#ffe4ea] text-4xl shadow-[0_10px_30px_rgba(232,93,117,0.15)]">
                  📸
                </div>

                <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Add your memories
                </h2>

                <p className="mt-3 text-[#75696c]">
                  Select up to 6 photos that mean something to you.
                </p>
              </div>

              {/* UPLOAD */}
              <label className="group mt-10 flex cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-[#e85d75]/25 bg-gradient-to-br from-[#fffaf7] to-[#fff0f3]/60 px-6 py-14 text-center transition duration-300 hover:border-[#e85d75]/60 hover:bg-[#fff0f3]/50">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-4xl shadow-[0_10px_30px_rgba(36,27,29,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                  📷
                </div>

                <span className="mt-5 text-lg font-extrabold">
                  Click to choose photos
                </span>

                <span className="mt-2 text-sm text-[#75696c]">
                  JPG, PNG or WEBP • Maximum 6 photos
                </span>

                <span className="mt-5 rounded-full bg-[#241b1d] px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-[#e85d75]">
                  Choose photos
                </span>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handlePhotos(e.target.files)}
                />
              </label>

              {/* PHOTO PREVIEW */}
              {photos.length > 0 && (
                <div className="mt-8">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-bold">Your memories</p>
                    <span className="text-sm text-[#75696c]">
                      {photos.length}/6 photos
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {photos.map((photo, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm"
                      >
                        <img
                          src={photo}
                          alt={`Memory ${index + 1}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                          <span className="text-xs font-semibold text-white">
                            Memory {index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => nextStep(2)}
                  className="rounded-full border border-black/10 bg-white px-6 py-4 font-bold transition hover:bg-[#fffaf7]"
                >
                  ← Back
                </button>

                <button
                  onClick={() => nextStep(4)}
                  className="group flex-1 rounded-full bg-[#241b1d] px-6 py-4 font-bold text-white shadow-[0_12px_25px_rgba(36,27,29,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e85d75]"
                >
                  Preview
                  <span className="ml-2 inline-block transition group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className={cardClass}>
              <div className="mb-6 text-center">
                <p className="text-sm font-semibold tracking-wide text-[#e85d75]">
                  ONE LAST LOOK ✨
                </p>

                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Your surprise is ready.
                </h2>
              </div>

              <div className="rounded-[30px] border border-white/80 bg-gradient-to-br from-[#fff0f3] via-white to-[#fff3e8] p-6 shadow-inner sm:p-10">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-[0_10px_30px_rgba(36,27,29,0.10)]">
                    ❤️
                  </div>

                  <p className="mt-6 text-sm font-semibold text-[#e85d75]">
                    A little surprise for you
                  </p>

                  <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                    Dear {name},
                  </h1>

                  <p className="mx-auto mt-6 max-w-xl whitespace-pre-wrap text-base leading-8 text-[#5f5356] sm:text-lg">
                    {message}
                  </p>

                  {photos.length > 0 && (
                    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {photos.map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square overflow-hidden rounded-2xl shadow-sm"
                        >
                          <img
                            src={photo}
                            alt={`Memory ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="mt-8 font-semibold">
                    With love,
                    <br />
                    {from} ❤️
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => nextStep(3)}
                  className="rounded-full border border-black/10 bg-white px-6 py-4 font-bold transition hover:bg-[#fffaf7]"
                >
                  ← Edit photos
                </button>

                <button
                  disabled={creating}
                  onClick={async () => {
  if (creating) return;

  setCreating(true);

  try {
    const id = crypto.randomUUID();
    const photoUrls: string[] = [];

   for (const file of photoFiles) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("surpriseId", id);

  const uploadResponse = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const uploadText = await uploadResponse.text();

  let uploadResult: { error?: string; path?: string } = {};

  try {
    uploadResult = JSON.parse(uploadText);
  } catch {
    console.error("Upload server response:", uploadText);
    alert(`Upload server error:\n${uploadText}`);
    setCreating(false);
    return;
  }

  if (!uploadResponse.ok) {
    console.error(uploadResult);
    alert(`Photo upload failed:\n${uploadResult.error}`);
    setCreating(false);
    return;
  }

  if (typeof uploadResult.path !== "string") {
    console.error("Upload API did not return a valid path:", uploadResult);
    alert("Photo upload failed. Please try again.");
    setCreating(false);
    return;
  }

  photoUrls.push(uploadResult.path);
}
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        from_name: from,
        message,
        photos: photoUrls,
        theme,
        love_date: loveDate,
        first_met_date: firstMetDate,
        first_met_text: firstMetText,
        special_moment_text: specialMomentText,
        secret_message: secretMessage,
        quiz_q1: quizQ1,
        quiz_a1: quizA1,
        quiz_q2: quizQ2,
        quiz_a2: quizA2,
        quiz_q3: quizQ3,
        quiz_a3: quizA3,
      }),
    });

    const responseText = await response.text();

let result: { error?: string } = {};

try {
  result = JSON.parse(responseText);
} catch {
  console.error("Create server response:", responseText);
  alert(
    `Could not create surprise.\nServer returned an unexpected response.`
  );
  setCreating(false);
  return;
}

if (!response.ok) {
  console.error(result);
  alert(
    `Could not create surprise:\n${
      result.error || "Please try again."
    }`
  );
  setCreating(false);
  return;
}

    window.location.href = `/s/${id}`;
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
    setCreating(false);
  }
}}
                  className="flex-1 rounded-full bg-[#e85d75] px-6 py-4 font-bold text-white shadow-[0_12px_25px_rgba(232,93,117,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d94d66] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {creating ? "Creating your surprise..." : "Create my surprise ❤️"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pb-8 text-center text-sm text-[#75696c]">
        Made with love by <span className="font-bold text-[#e85d75]">GituLove</span> ❤️
      </footer>
    </main>
  );
}