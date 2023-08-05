import {React,useState} from 'react';
import styled from 'styled-components';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { sliderItems } from '../data';
import { mobile } from '../responsive';

const Container = styled.div`
        width:100%;
        height: 100vh;
        display:flex;
        position:relative;
        overflow: hidden;
        ${mobile({display : 'none'})}
`
const Arrow = styled.div`
        width:50px;
        height:50px;
        background-color:#fff7f7;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content : center;
        position:absolute;
        top:0;
        bottom:0;
        left : ${props=> props.direction === "left" && "10px"};
        right :${props=> props.direction === "right" && "10px"};
        margin:auto;
        cursor : pointer;
        opacity : 0.5;
        z-index : 2;
`

const Wrapper = styled.div`
        height:100%;
        display:flex;
        transition : all 1.5s ease;
        transform : translateX(${props=>props.slideIndex * -100}vw)
`
const Slide = styled.div`
        width: 100vw;
        height: 100vh;
        display : flex;
        align-items : center;
        background-color : #${props=> props.bg}
`
const ImageContainer = styled.div`
        height : 100%;
        margin-left :  10%;
        flex:1 
`
const Image = styled.img`
        height : 80%
`
const InfoContainer = styled.div`
        flex:1;
        padding: 50px;
`

const Title = styled.h1`
        font-size: 70px;
`
const Desc = styled.p`
        margin: 50px 0px;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 3px;
`
const Button = styled.button`
        padding : 10px;
        font-size: 20px;
        background-color: transparent;
        cursor: pointer;
`
const Slider = () => {
    const [slideIndex, setslideIndex] = useState(0);
    const handleClick = (direction)=>{
        if(direction === "left")
        {
            setslideIndex(slideIndex > 0 ? slideIndex-1:2);
        }
        else{
            setslideIndex(slideIndex < 2 ? slideIndex+1:0);
        }
    }
  return (
    <Container>
       <Arrow direction = "left" onClick={()=>{handleClick("left")}}>
       <ArrowLeftOutlinedIcon/>
       </Arrow>
       <Wrapper slideIndex = {slideIndex}>
       {sliderItems.map((slide)=>(
        <Slide key={slide.id} bg={slide.bg}>
            <ImageContainer>
                <Image src={slide.img} />
            </ImageContainer>
            <InfoContainer>
                <Title>{slide.title}</Title>
                <Desc>{slide.desc}</Desc>
                <Button>SHOP NOW</Button>
            </InfoContainer>
         </Slide>
       ))}
         
       </Wrapper>
       <Arrow direction = "right" onClick={()=>{handleClick("right")}}>
       <ArrowRightOutlinedIcon/>
       </Arrow>
    </Container>
  );
}

export default Slider;
