import { useState , useCallback , useEffect , useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  
   // usecallback is used for memoization caching the vakue 
   //to remember the previous one 
   // it receives a function and dependencies at what it is dependent 
   // in below code we generate the password and setPassword using usestate function above and these are dependent on numberAllowed , charAllowed and length of password   // 

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*(){}[]~"
    for(let i = 1; i <= length; i++)
    {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword]) 

  // useEffect is used to sync to external system some thing that is not control by react but us
  // to load by our own 
  // first time page load or any dependency is changed then it it changed or invoked
  // in below we want to load the password at when window opens and when change happens
  // for calling the password generator 
  // without triggering any buttons 

  // one method without using useEffect hooks to make button and trigger it

  // second is this useEffect hooks
  // if we directly call password generator

  useEffect(() => {passwordGenerator()} , [length , numberAllowed, charAllowed, passwordGenerator])

  // new hook to take reference of anything
  // we have used it in input tag 
  // ref = {passwordRef}
  // here it is used
  const passwordRef = useRef(null)

  // method to copy the password
  const copyToClipboard = useCallback(() => {
    // here mainly used 
    passwordRef.current?.select(); // to select anything
    passwordRef.current?.setSelectionRange(0,36); // ranging the selection
    window.navigator.clipboard.writeText(password) // window object gives us this method to copy anything to clipboard
  },[password])



  return (
    <>
      <div className='w-full h-full flex justify-center my-20'>
      <div className=' w-full max-w-xl max-auto flex flex-col justify-center align-middle bg-red-400 px-5 rounded-lg'
      >
      <h1 className='text-center font-medium text-4xl p-5 ' >Password Generator</h1>
      <div className='flex gap-1 w-[100%] justify-center mb-5'>
      <input className='outline-none w-[80%]  px-5 rounded-lg h-10 text-white'
      type="text"
      value = {password}
      placeholder='Password'
      readOnly 
      ref={passwordRef}
      />
      <button className='outlne-none bg-blue-700 text-white px-5 h-10 rounded-lg py-0 hover:bg-blue-600 shrink-0' 
      onClick={copyToClipboard}
      >copy</button>
      </div>
      <div className='flex justify-center gap-2 mb-5'>
        <input type="range"
        min={8}
        max={36}
        value={length}
        onChange={(e) => {setLength(e.target.value)}}
        />
        <label>Length : {length}</label>
        <input type="checkbox" 
          defaultChecked = {numberAllowed}
          onChange={() => {
            setNumberAllowed((prev) => !prev)
          }}
        /> Number 
        <input type="checkbox"
        defaultChecked = {charAllowed}
        onChange={() => {
          setCharAllowed((prev) => !prev)
        }}
        /> Special Char 
      </div>
      </div>
      </div>
    </>
  )
}

export default App
