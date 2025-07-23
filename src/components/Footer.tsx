import Dua from "../assets/Dua.png";
import Frame from "../Assets/Frame.png";
import Home from "../Assets/Home.png";
import Maktab from "../Assets/Maktab.png";
import Quran from "../Assets/Quran.png";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center py-2 text-xs text-gray-600">
        <div className="flex flex-col items-center text-purple-600">
          <img src={Home} alt="Home" className="w-5 h-5" />
          <span className="text-[11px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={Quran} alt="Quran" className="w-5 h-5" />
          <span className="text-[11px] font-medium">Quran</span>
        </div>
        <div className="flex flex-col items-center bg-purple-600 text-white p-2 rounded-full -mt-6 shadow-md">
          <img src={Frame} alt="Center" className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-center">
          <img src={Maktab} alt="Maktab" className="w-5 h-5" />
          <span className="text-[11px] font-medium">Maktab</span>
        </div>
        <div className="flex flex-col items-center">
          <img src={Dua} alt="Dua" className="w-5 h-5" />
          <span className="text-[11px] font-medium">Dua</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;