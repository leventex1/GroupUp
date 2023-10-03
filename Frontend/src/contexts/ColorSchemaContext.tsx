import { createContext, useContext } from "react"
import Colors from "@/data/Colors";
import { ColorsType } from "@/data/Colors";

const ColorSchemaContext = createContext<ColorsType | null>(null);

export const useColorSchema = () => useContext(ColorSchemaContext);

interface PropType {
    children: any
}

const ColorSchemaProvider = ({
    children
}: PropType) => {

    return (
        <ColorSchemaContext.Provider 
            value={Colors}
        >
            {children}
        </ColorSchemaContext.Provider>
    )
}

export default ColorSchemaProvider;