const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1b1f2a] to-[#141824] text-gray-400">
      <div className="max-w-6xl mx-auto px-6 py-14 text-center">

        {/* Logo / Brand */}
        <h2 className="text-3xl font-bold text-white tracking-wide">
          Data<span className="text-[rgba(78,55,165)]">Stdio</span>
        </h2>
        <p className="text-[11px] uppercase tracking-[0.3em] mt-1 text-gray-400">
          Web Designer
        </p>

        {/* Description */}
        <p className="max-w-xl mx-auto mt-6 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-10"></div>

        {/* Contact Info */}
        <p className="text-sm">
          1120 Lorem ipsum dolor sit amet, KC 179050, Chandigarh.
        </p>
        <p className="text-sm mt-1">
          +01 2345 6789 12 &nbsp; | &nbsp; +01 2345 6789 12
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-8">
          {["f", "in", "g", "Be", "p"].map((icon) => (
            <div
              key={icon}
              className="w-9 h-9 border border-white/20 flex items-center justify-center
                         hover:border-[rgba(78,55,165)] hover:text-white
                         transition cursor-pointer"
            >
              <span className="text-sm font-medium">{icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} DataStdio. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
