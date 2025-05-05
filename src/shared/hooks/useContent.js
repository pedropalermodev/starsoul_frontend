import { useContext } from "react";
import { ContentContext } from "../contexts/ContentContext";

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent deve ser usado dentro de um ContentProvider');
    }
    return context;
};
