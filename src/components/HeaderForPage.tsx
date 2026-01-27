import { ActionButton } from "./actionButton";

type HeaderForPageProps = {
    title: string;
    subtitle: string;
    button: boolean;
    buttonLabel?: string;
    onButtonClick?: () => void;
    
}

export const HeaderForPage = ({title, subtitle, button, buttonLabel}: HeaderForPageProps) => {
    return(
        <div className="flex items-center justify-between mb-8">
            <div >
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-1">{subtitle}</p>
            </div>
            {button &&(
            <ActionButton label={buttonLabel} onClick={() => console.log('Abrir Modal')} />
            )
            }
            
          </div>
    );
}