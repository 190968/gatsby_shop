import React from "react";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import { YMaps, Map, Placemark, Hint } from 'react-yandex-maps';

import { connect } from "react-redux";
import { Link } from "gatsby";



const NewMap = styled.div`
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
    text-align: center;
    background-color: #fff;
    
    p {        
        margin: 10px 0 0;
        padding: 20px; 
        @media(max-width: 1000px) {
           font-size: 16px;
           padding: 20px; 
        }       
    }
   @media(max-width: 1000px) {
       width: 100vw;
   }
   
`;



const Locations = ({ locations }) => { 
   
     return (    
        <>
            <Helmet>
            
                <title>Store in your location</title>
                <html lang="en" /> 
            </Helmet>        
            <NewMap >
                    <YMaps query={{ lang: 'en_RU' }} style={{paddingLeft:"20vw"}}>
                    <p>
                        <Link to="/" className="to_main locations" title="to main"></Link>
                        This is a map of our store in your city. 
                   </p>                    
                        <Map 
                            defaultState={{ center: [locations[0], locations[1]], zoom: 12 }}
                            height="80vh" width="100%" 
                           
                           
                        >
                            <Placemark 
                                geometry={[locations[0]-0.030, locations[1] + 0.040]}  
                               
                            >
                            <Hint  options= {{
                                    
                                    contentLayout: 'Come on, drag already!'}} />
                            </Placemark>
                            <Placemark 
                                geometry={[locations[0] + 0.025, locations[1] - 0.030]}  
                                properties= {{
                                    iconCaptition: "dfdf",
                                    hintContent: 'Come on, drag already!',
                                    balloonContent: 'HGBKHBJKH'
                                },{
                                    preset: 'islands#circleDotIcon',
                                    iconColor: 'yellow'
                                }}
                            />
                            
                        </Map>
                        
                    </YMaps>
                    
            </NewMap> 
        </>                        
   

)};

const mapStateToProps = state => ({
   
    locations: state.app.locations
});
const mapDispatchToProps = dispatch => ({  
      
});  

export default connect(mapStateToProps,mapDispatchToProps)(Locations);
   