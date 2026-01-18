export default function JobsPage() {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "Google",
      type: "Remote",
      salary: "$3k – $5k",
    },
    {
      title: "UI/UX Designer",
      company: "Dribbble",
      type: "Full Time",
      salary: "$2k – $4k",
    },
    {
      title: "Backend Developer",
      company: "Amazon",
      type: "Onsite",
      salary: "$4k – $6k",
    },
    {
      title: "Product Manager",
      company: "Meta",
      type: "Hybrid",
      salary: "$5k – $7k",
    },
  ];

  return (
    <main className="bg-[#0B0F1A] text-white min-h-screen mt-[40px]">

      {/* HERO */}
      <section className="relative py-28 text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f3c] to-transparent blur-3xl opacity-60" />
        <h1 className="relative text-4xl md:text-5xl font-bold leading-tight">
          Unlock Your Skill <br />
          Potential With <span className="text-[#7370FF]">DataStdio</span>
        </h1>
        <p className="relative mt-6 text-gray-400 max-w-2xl mx-auto">
          Find your dream job, improve your skills, and connect with top
          companies around the world.
        </p>

        <div className="relative mt-8 flex justify-center gap-4">
          <a
            href="#jobs"
            className="px-6 py-3 rounded-xl bg-[#7370FF] hover:bg-[#5f5cff] transition"
          >
            Find Jobs
          </a>
          <a
            href="/companies"
            className="px-6 py-3 rounded-xl border border-white/20 hover:border-[#7370FF] transition"
          >
            Browse Companies
          </a>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 -mt-10">
        {[
          { value: "850+", label: "Hiring Companies" },
          { value: "424+", label: "Active Jobs" },
          { value: "30+", label: "Job Categories" },
          { value: "10k+", label: "Candidates" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10"
          >
            <h3 className="text-2xl font-bold text-[#7370FF]">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* FIND JOB */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-sm text-[#7370FF] uppercase tracking-widest">
            Find Your Dream Job
          </span>
          <h2 className="text-3xl font-bold mt-4">
            Build Your Career Path
          </h2>
          <p className="text-gray-400 mt-4">
            Thousands of jobs are available. Choose the right one that matches
            your skills and passion.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-gray-300">
            <li>✔ Verified companies</li>
            <li>✔ Remote & onsite jobs</li>
            <li>✔ Skill-based matching</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-[#7370FF]/20 to-transparent rounded-3xl p-10 border border-white/10">
          <p className="text-lg font-semibold">
            Start exploring opportunities today 🚀
          </p>
        </div>
      </section>

      {/* JOB LIST */}
      <section id="jobs" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Recent Jobs</h2>
          <a
            href="/jobs"
            className="text-sm text-[#7370FF] hover:underline"
          >
            See All
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#7370FF] transition"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{job.company}</p>

              <div className="flex gap-3 mt-4 text-xs">
                <span className="px-3 py-1 rounded-full bg-white/10">
                  {job.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10">
                  {job.salary}
                </span>
              </div>

              <a
                href="/apply"
                className="block text-center mt-6 w-full py-2 rounded-xl bg-[#7370FF]/20 hover:bg-[#7370FF] transition"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/5 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-left">
            {[
              "How do I apply for a job?",
              "Are jobs verified?",
              "Is DataStdio free?",
            ].map((q) => (
              <div
                key={q}
                className="bg-black/40 border border-white/10 rounded-xl p-4"
              >
                <p className="font-medium">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
