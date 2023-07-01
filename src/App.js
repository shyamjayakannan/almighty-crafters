import MainPage from "./pages/mainpage/MainPage";

const colors = [
    { theme: '#b308de', subtheme: '#7000ff' },
    { theme: '#A3490D', subtheme: '#ED6A13' },
    { theme: '#2270A1', subtheme: '#32A5ED' },
    { theme: '#32A11A', subtheme: '#4AED26' }
];

const index = Math.floor(Math.random() * colors.length);

document.documentElement.style.setProperty('--theme', colors[index].theme);
document.documentElement.style.setProperty('--subtheme', colors[index].subtheme);

function App() {
    return (
        // <Routes>
        //     {/* <Route path="/registration" element={<Form />} /> */}
        //     <Route path="/home" element={<MainPage />} />
        //     <Route path="*" element={<Navigate to="/home" />} />
        // </Routes>
        <MainPage />
    );
};

export default App;