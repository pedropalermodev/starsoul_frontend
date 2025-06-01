import { useContext } from "react";
import { ContentContext } from "../contexts/ContentContext";

export const useContent = () => useContext(ContentContext);
