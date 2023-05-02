import { useState , useEffect} from "react";

const useRXjs = (data) => {  //BehaviorSubject-tel lesz a data-n pl a getValue fuggveny
    const [val, setVal] = useState(data.getValue());

    useEffect(()=>{
        // data.subscribe((nexValue: T) => setVal(nexValue)) // ua, mint lent
        const subsciption = data.subscribe(setVal)
        return () => subsciption.unsubscribe()  // uriti a subscription-t (leiratkozas)
    },[])
    return val;
}
 
export default useRXjs;