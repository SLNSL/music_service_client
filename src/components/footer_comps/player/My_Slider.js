import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import './player.css'


const My_Slider = styled(Slider)(({ theme }) => ({
    color: "var(--main-light)",
    height: 3,
    className: "my_slider",
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 19,
        width: 19,
        backgroundColor: '#ffffff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 66,
            width: 1,
            backgroundColor: '#0734fd',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 7,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#f8ff00' : '#ffffff',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));

export default My_Slider;