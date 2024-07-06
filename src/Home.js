import { useEffect, useState } from "react";
import axios from "axios";
import { categories,language,country } from "./Filterdata";
import {Layout} from "antd";
const { Header, Sider } = Layout;
function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggle,settoggle]=useState(true);
    const [click,setclick]=useState(false);
    const [coun,setcountry]=useState("us");
    const [lan,setlanguage]=useState("en");
    const [cat,setcategories]=useState("business");
    useEffect(() => {
        const fetch = async () => {
            
            try {
                        const res = await axios.get('https://newsapi.org/v2/top-headlines/', {
                            params: {
                                apiKey: 'db5fc56e9fd54a4bac134dae64502819',
                                country: coun,
                                category: cat,
                                language: lan
                            }
                        });
                        setData(res.data.articles);
                        localStorage.setItem("odata",JSON.stringify(res.data.articles));
                        setLoading(false);
                    } catch (err) {
                        console.error(err);
                        setLoading(false);
                    }
        }
        fetch();
    }, [coun,lan,cat]);

    const loadMore = async () => {
        if((localStorage.getItem("extradata"))==null)
        {
            try{
                const res = await axios.get('https://newsapi.org/v2/everything?q=modi&from=2024-07-01&to=2024-07-01&sortBy=popularity&apiKey=db5fc56e9fd54a4bac134dae64502819');
                setData([...data, ...res.data.articles]);
                localStorage.setItem("extradata",JSON.stringify(res.data.articles));

            }
            catch (err){
                console.error(err);
            }
        }
        else
        {
            const ed=JSON.parse(localStorage.getItem("extradata"));
            setData([...data,...ed]);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center">
                <h1>Loading...</h1>
            </div>
        );

    return (
        <>
<Layout hasSider style={{ minHeight: "100vh" }}>
<Sider  width={300}
        className="overflow-y-auto"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "linear-gradient(to right, #f0f0f0, #00FFFF)",
          overflowY: "auto",
          height: "100vh",
        }}>
<div class={`h-full px-3 py-4 overflow-y-auto bg-gradient-to-tr from-neutral-100 to-cyan-100 dark:bg-gray-800 ${toggle? "translate-x-0" : "-translate-x-full"}`}>
      <ul class="space-y-2 font-medium">
         <li className=" flex justify-between text-black">
               <span class="ms-3 font-serif font-bold text-xl">Filter :</span>
         </li>
         <li>
         <h2 className=" m-5 text-black">Categories :</h2>
         <div className=" grid grid-cols-2 gap-1">
            {
                categories.map((e,idx)=>{
                    return(<>
                      <div className="bg-red-100 p-5 capitalize cursor-pointer rounded-lg contain-content overflow-hidden shadow-xl content-stretch" onClick={()=>{
                        setcategories(e);
                       }}>{e}</div>
                    </>)
                })
            }
            </div>
         </li>
         <li>
         <h2 className=" m-5 text-black">Language :</h2>
         <div className="grid grid-cols-4 p-2 gap-5">
            {
                language.map((e,idx)=>{
                    return(<>
                       <button className="shadow-xl bg-red-100 capitalize rounded-lg " onClick={()=>{
                        setlanguage(e);
                       }}>{e}</button>
                    </>)
                })
            }
            </div>
         </li>
         <li>
         <h2 className=" m-5 text-black">Country :</h2>
         <div className=" grid grid-cols-4 p-2 gap-5">
            {
                country.map((e,idx)=>{
                    return(<>
                       <button className=" capitalize  text-black bg-red-100 shadow-xl p-1 rounded-lg" onClick={()=>{
                        setcountry(e);
                       }}>{e}</button>
                    </>)
                })
            }
            </div>
         </li>
      </ul>
   </div>
</Sider>
        <Layout className=" ml-64">
        <Header>
        <span className="text-center text-white p-5">E-library</span>

        </Header>
            <div className="bg-fixed bg-opacity-80" style={{ backgroundImage: `url("bg.png")`, backgroundSize: "cover" }}>
                <div className="p-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 space-x-3">
                    {data.map((e, idx) => (
                        <a key={idx} href={e.url} target="_blank" rel="noopener noreferrer">
                            <div className="p-2 rounded-2xl my-10 h-max shadow-2xl text-black font-bold bg-opacity-50 bg-gray-900">
                                <div>
                                    <img src={e.urlToImage} className="h-80 w-full rounded-full" alt="Image not found" />
                                </div>
                                <div className="p-5 bg-white bg-opacity-80">
                                    <h1>{e.title}</h1>
                                    <p>{new Date(e.publishedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
                {!click?
                    <div className="flex justify-center pb-5">
                    <button className="border-2 rounded-xl px-4 py-3 text-white bg-gradient-to-tr from-slate-800 to-black font-bold" onClick={()=>{loadMore();setclick(true)}}>
                        Show more
                    </button>
                </div>:null}
                
            </div>
            </Layout>
    </Layout>

        </>
    );
}

export default Home;
