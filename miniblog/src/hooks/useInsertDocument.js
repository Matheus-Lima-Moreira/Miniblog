import { useReducer, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
}

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [isCancelled, setIsCancelled] = useState(false);
  
  // deal with memory leak
  const checkCancelBeforeDispatch = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {    
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    } finally {
      let isCancelled = true;
      setIsCancelled(isCancelled);
    }
  };

  return { insertDocument, response };
};