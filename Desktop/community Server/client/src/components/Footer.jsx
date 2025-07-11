function Footer() {
  return (
    <footer className="w-full bg-white py-6 mt-8 shadow-inner flex flex-col md:flex-row items-center justify-between px-4 gap-2 text-gray-500 text-sm">
      <div>About Us | Privacy Policy | Contact | Socials</div>
      <div>&copy; {new Date().getFullYear()} AI Minute</div>
    </footer>
  );
}

export default Footer; 