import "styles/ui/Button.scss";

export const Button = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button ${props.className}`}>
    {props.children}
  </button>
);

export const ButtonLight = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button-light ${props.className}`}>
    {props.children}
  </button>
);

export const ButtonGame = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`primary-button-game ${props.className}`}>
    {props.children}
  </button>
);

export const ButtonHome = props => (
  <button
    {...props}
    className={`primary-button-home-${props.className}`}>
    {props.children}
  </button>
);
