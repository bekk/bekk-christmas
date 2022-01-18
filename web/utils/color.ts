export const getRainbowColor = (
  numberOfSteps: number,
  step: number
): string => {
  let red, green, blue;
  let h = step / numberOfSteps;
  let i = ~~(h * 6);
  let f = h * 6 - i;
  let q = 1 - f;
  switch (i % 6) {
    case 0:
      red = 1;
      green = f;
      blue = 0;
      break;
    case 1:
      red = q;
      green = 1;
      blue = 0;
      break;
    case 2:
      red = 0;
      green = 1;
      blue = f;
      break;
    case 3:
      red = 0;
      green = q;
      blue = 1;
      break;
    case 4:
      red = f;
      green = 0;
      blue = 1;
      break;
    case 5:
      red = 1;
      green = 0;
      blue = q;
      break;
  }
  let color =
    "#" +
    ("00" + (~~(red * 255)).toString(16)).slice(-2) +
    ("00" + (~~(green * 255)).toString(16)).slice(-2) +
    ("00" + (~~(blue * 255)).toString(16)).slice(-2);
  return color;
};
