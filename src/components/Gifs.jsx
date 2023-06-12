import { useState } from "react";
import LinkIcon from '@mui/icons-material/Link';
import Check from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function Gifs({ images, url }) {

    const [isCopy, setIsCopy] = useState(false);

    const copyCache = () => {
        navigator.clipboard.writeText(content);
        setIsCopy(true);
        
        setTimeout(() => {
            setIsCopy(false)
        }, 2000)
    }    

    const content = url;
     
    return (
        <div className='m-2 max-mobile-l:m-1'>
            <img src={images.fixed_width.url} alt="Giphy API" className="gifs" />

            <div className="flex justify-start items-center">
                <button className='url' onClick={copyCache}>
                    <LinkIcon className='mr-1' /> Copier le lien
                </button>

                {isCopy && <span className="text-green-300 mt-2 ml-1"><Check /></span>}
            </div>
            
        </div>
        
    )
}
