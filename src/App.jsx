import { useState } from "react";
import Gifs from "./components/Gifs";
import Loader from "./components/Loader";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function App() {

    const [isGifs, setIsGifs] = useState([]);
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const URL = `https://api.giphy.com/v1/gifs/search?&api_key=${process.env.GIPHY_API_KEY}&q=${search}&limit=25&lang=fr`;

    const isShow = () => {
        setIsOpen(!isOpen)
    }

    const isSearch = (e) => {
        setSearch(e.target.value);
    };

    const setError = () => {
        if(search.length === 0)
            setIsError(true);
        setTimeout(() => {
            setIsError(false);
        }, 3000)
    }

    const isFetching = () => {
        setIsLoading(true);
        
        fetch(URL)
        .then((response) => response.json())
        .then((res) => setIsGifs(res.data))
        
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)

        setIsOpen(!isOpen);
        setError();
    };


    return (
        <div className="">
            {isError && <span className="error">Ecrivez un mot dans la barre de recherche.</span>}

            <div className='flex items-center justify-center h-screen px-5 max-mobile-l:px-0'>
                <img src="https://developers.giphy.com/branch/master/static/api-512d36c09662682717108a38bbb5c57d.gif"
                    className="rounded-md object-cover bg-center bg-cover bg-no-repeat min-h-[35em]"
                    alt="Giphy API"
                />

                <div className="flex justify-center absolute w-full max-w-2xl px-10 max-mobile-l:px-6">
                    <input className="input" type="text" placeholder='Rechercher un gif...' onChange={isSearch} />

                    <button className="button" onClick={isFetching}>
                        <SearchIcon fontSize="large"/>
                    </button>
                </div>
                
            </div>
            
            
            {isGifs.length > 0 &&
                <div className={`${!isOpen ? 'hidden' : 'modal'}`}>
                    <span className={`${isLoading ? 'hidden' : 'results'}`}>Résultats pour : "{search}"</span>
                    <div className="content">
                        <CloseIcon className="close" fontSize="large" onClick={isShow} />
                        {isLoading ? <Loader /> :
                            <>
                                {isGifs.map((gifs) =>
                                    <Gifs key={gifs.id} {...gifs} /> 
                                )}
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}