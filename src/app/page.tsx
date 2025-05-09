import Image from "next/image";
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Background from "@/components/background";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-black to-[#1a0000] text-white">
      
      <Background />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#DC143C] to-[#B01030] bg-clip-text text-transparent">
            ABYSS STUDIOS
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto">
            Crafting immersive gaming experiences that push the boundaries of entertainment
          </p>
          <button className="gaming-button">
          <Link href="#games" className="gaming-button">
            Explore Our Games
          </Link>
          </button>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-15 px-4 bg-gradient-to-b from-black/50 to-[#1a0000]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            <div>
              <h4 className="section-title">"The More you Stare into The Abyss the more it Stares Back"</h4>
              <p className="text-lg text-white/80 mb-5">
              Abyss Studios Private Limited or Abyss Studios, Founded in 2022 by Mr. Suryanshu Mittal as an indie game studio (then known as Underworld Indie Games), not formally starting full operations until 2024.
              </p>
              <p className="mb-5">
              At Abyss Studios We, Focus on Bringing the Stories to life with an interactive and artistic touch.
              Here we employ the use of Unreal Engine along with other industry standard tools like Autodesk Maya, Zbrush etc. to Bring the stories written by talented writers to life in the form of immersive experiences
              </p>
              <p className="text-lg text-white/80">
                Founded with a vision to revolutionize the gaming industry, we combine cutting-edge
                technology with creative storytelling to deliver unforgettable adventures.
              </p>
            </div>
            <div className="card">
              <div className="aspect-square rounded-lg overflow-hidden gradient-overlay">
                <Image src="/images/home.png" alt="Home" layout="fill" objectFit="cover" className="square" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Games Section */}
      <section id="games" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{name: "God Of War Lite", image: "/images/gow.png", breif: "A short 2D demake of GOW",genre:"Platformer,RPG" ,alt:"https://the-abyss-games.itch.io/god-of-war-lite"},
             {name: "Mansion of Chaos", image: "/images/moc.png", breif: "An Immersive First-Person Explorer",genre:"Exploration,Sombre,Jam", alt:"https://the-abyss-games.itch.io/mansion-of-chaos"},
              {name: "Pesky Labrinths", image: "/images/pl.png", breif: "A Short Dungeon Explorer Demo",genre:"Arcade,Jam" ,alt: "https://the-abyss-games.itch.io/the-pesky-labyrinths"},
              {name:"Seek a Little", image:"/images/sal.png",breif:"Survive the Onslaught...and never blink!",genre:"Exploration,Thriller,Jam",alt:"https://the-abyss-games.itch.io/seek-a-little"},
               {name:"Under Beast", image:"/images/ub.png",breif:"Explore a Dark world overrun by...Influencers?",genre:"Platformer,RPG",alt:"https://the-abyss-games.itch.io/under-beast"},
               {name:"Coming Soon", image:"/images/soon.jpeg",breif:"",genre:"",alt:"https://the-abyss-games.itch.io/"}, ].map((game, index) => (
              <div key={index} className="card group">
                <Link href={game.alt}>
                <div className="aspect-square mb-4 overflow-hidden gradient-overlay relative w-55 h-45 mx-auto">
                  <Image src={game.image} alt={game.name} layout="fill" objectFit="cover" className="square" />
                </div>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#DC143C] to-[#B01030] bg-clip-text text-transparent">
                  {game.name}
                </h3>
                <p className="text-white/70">
                  {game.breif}
                </p>
                <p className="text-red/70">
                  {game.genre}
                </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Suryanshu Mittal", image: "/images/surya.png", role: "Founder" },
              { name: "Daksh Kaushik", image: "/images/Daksh.jpg", role: "Director of Animation and 3D" },
              { name: "Rijul Paul", image: "/images/rijul.png", role: "Director of Production" },
            ].map((member, index) => (
              <div key={index} className="card text-center">
                <div className="aspect-square rounded-full mb-4 overflow-hidden gradient-overlay relative w-32 h-32 mx-auto">
                  <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" className="rounded-full" />
                </div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#DC143C] to-[#B01030] bg-clip-text text-transparent">
                  {member.name}
                </h3>
                <p className="text-white/70">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-32 px-4 bg-gradient-to-b from-black/50 to-[#1a0000]/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-title mx-auto">Ready to Connect?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Whether you're interested in our games, want to collaborate, or just have a question,
            we'd love to hear from you. Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact" className="gaming-button text-lg px-12 py-4">
              Get in Touch
            </Link>
            <Link href="/careers" className="gaming-button text-lg px-12 py-4 bg-gradient-to-r from-[#B01030] to-[#8B0000] hover:from-[#8B0000] hover:to-[#600000]">
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#DC143C]/20 bg-gradient-to-b from-black to-[#1a0000]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">
            © 2025 Abyss Studios Private Limited. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
