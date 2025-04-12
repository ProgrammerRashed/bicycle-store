import { Facebook, Twitter, Instagram, ArrowUpRight } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Cody Fisher",
    position: "CFO (Chief Financial Officer)",
    image:
      "https://carento-nextjs.vercel.app/assets/imgs/team/team-1/portrait-1.png",
  },
  {
    id: 2,
    name: "Darrell Steward",
    position: "CEO (Chief Executive Officer)",
    image:
      "https://carento-nextjs.vercel.app/assets/imgs/team/team-1/portrait-2.png",
  },
  {
    id: 3,
    name: "Ronald Richards",
    position: "COO (Chief Operating Officer)",
    image:
      "https://carento-nextjs.vercel.app/assets/imgs/team/team-1/portrait-3.png",
  },
  {
    id: 4,
    name: "Jerome Bell",
    position: "CMO (Chief Marketing Officer)",
    image:
      "https://carento-nextjs.vercel.app/assets/imgs/team/team-1/portrait-4.png",
  },
];

const AboutTeamSection = () => {
  return (
    <div className="container mx-auto px-4 pb-10">
      <div className="text-center mb-8">
        <h4 className="text-gray-500 text-lg">Awesome Teams</h4>
        <h2 className="text-3xl font-bold">Meet Our Agents</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.position}</p>
              <div className="flex justify-center gap-4 mt-4">
                <Facebook
                  size={20}
                  className="cursor-pointer hover:text-primary-jext transition"
                />
                <Twitter
                  size={20}
                  className="cursor-pointer hover:text-primary-jext transition"
                />
                <Instagram
                  size={20}
                  className="cursor-pointer hover:text-primary-jext transition"
                />
                <ArrowUpRight
                  size={20}
                  className="cursor-pointer hover:text-primary-jext transition"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeamSection;
