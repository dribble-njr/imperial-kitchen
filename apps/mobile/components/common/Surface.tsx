import { Surface as PaperSurface, SurfaceProps } from 'react-native-paper';

interface CustomSurfaceProps extends SurfaceProps {
  children: React.ReactNode;
}

export default function Surface({ children, mode = 'flat', ...rest }: CustomSurfaceProps) {
  return (
    <PaperSurface {...rest} mode={mode}>
      {children}
    </PaperSurface>
  );
}
