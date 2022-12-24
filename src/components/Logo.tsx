const logo = require('../assets/wco-logo.png');

interface LogoProps {
    width: string;
    height: string;
}

const Logo = ({ width, height }: LogoProps) => {
    return (
        <img src={logo} style={{ width: width, height: height }} />
    );
};

export default Logo;
