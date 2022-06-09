import Link from "next/link"
import Head from 'next/head'

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <Head>
        <title>Blogeeker - 個人博客 - 科技/理財/生活</title>
        <link rel="icon" href="/b.png" />
        <meta name="google-site-verification" content="r5OQ-RpoNj1tCUjfAyVZH8rL17Wwtdqmdnm3vu_giPs" />
        <meta name="description" content="Blogeeker - Alok的個人博客, 分享前後端應用開發、物聯網、嵌入式、機器學習等知識;業餘研究股市,分享策略和回測結果" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2667865280424651" crossOrigin="anonymous"></script>
      </Head>
      <div className="flex items-center space-x-5">
        <Link href="/">
          {/* <img 
            className="w-44 object-contain cursor-pointer"
            src="https://links.papareact.com/yvf" 
            alt="" 
          /> */}
          <h1 className="text-2xl cursor-pointer">Blogeeker</h1>
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5">
          {/* <h3>About</h3>*/}
          {/* <h3>Contact</h3>  */}
          {/* <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">Follow</h3> */}
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        {/* <h3>
          Sign In
        </h3> */}
        <h3 className="border px-4 py-1 rounded-full cursor-pointer hover:bg-green-400 hover:text-white transition-all">
          <Link  href={`/categories/`}>Categories</Link>
        </h3>
      </div>
    </header>
  )
}

export default Header