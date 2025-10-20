import { Volume2 } from 'lucide-react'; 

const Volume: React.FC = ()=>{
    return (
        <button
        className="w-5 h-5 rounded-full bg-theme flex items-center justify-center hover:bg-theme/70 transition"
        >
            <Volume2 className="w-3 h-3 text-white" />
        </button>
    ); 
}
export default Volume;