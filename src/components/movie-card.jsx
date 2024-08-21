import React, { useState } from "react";
import { Card, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tooltip, useDisclosure } from "@nextui-org/react";

const MovieCard = ({movie}) => {
    const [info, setInfo] = useState({});
    const {isOpen, onOpen, onClose} = useDisclosure();
    const API_URL = 'https://www.omdbapi.com?apikey=c032e2d7';

    const getFullInfo = async () => {
        const response = await fetch(`${API_URL}&t=${movie.Title}&plot=full`);
        const data = await response.json();
        setInfo(data);
        onOpen();
    }
        
    return (
        <>
        <Tooltip showArrow={true} content={"View "+ (movie.Type ?? 'movie').toLowerCase() +" info"} color="default" placement="top">
            <div onClick={() => getFullInfo()}>
                <Card className='movie'>
                    <div>
                        <p>{ movie.Year }</p>
                    </div>
                    <div>
                        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.title}/>
                    </div>
                    <div>
                    <span>{movie.Type}</span>
                        <h3>{movie.Title}</h3>
                    </div>
                </Card>
            </div>
        </Tooltip>

        <Modal 
            size='5xl' 
            isOpen={isOpen} 
            onClose={onClose} 
            className="dark"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1" style={{color: '#b4e4f9', fontSize: '26px'}}>{info?.Title}</ModalHeader>
                    <ModalBody>
                        <p> 
                        {info?.Plot}
                        </p>
                        {
                            info?.Actors !== "N/A" ?
                            (<p><b>Notable Actors</b>: {info?.Actors}</p>)
                            :
                            ''
                        }
                        {
                            info?.Director !== "N/A" ?
                            (<p><b>Director</b>: {info?.Director}</p>)
                            :
                            ''
                        }
                        {
                            info?.Runtime !== "N/A" ?
                            (<p><b>Runtime</b>: {info?.Runtime}</p>)
                            :
                            ''
                        }
                        {
                            info?.Year !== "N/A" ?
                            (<p><b>Year</b>: {info?.Year}</p>)
                            :
                            ''
                        }
                        {
                            info?.Ratings != null && info?.Ratings.length > 0 ?
                            (
                                <>
                                    <p><b>Ratings</b>:</p>
                                    {      
                                        info?.Ratings.map((rating, idx) => 
                                            (
                                                <p key={idx} style={{'paddingLeft': '20px'}}>{rating?.Source}: {rating?.Value}</p>
                                            )
                                        )
                                    }
                                </>
                            )
                            :
                            (<p>No Ratings</p>)
                        }
                        
                        <p></p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
    );
}
export default MovieCard