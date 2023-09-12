import { useState } from "react"
import DataBase from "../../NftsData.json"
import NftsMarketBox from "../nftsMarketBox/NftsMarketBox"
import "../nftsMarket/NftsMarket.scss"
import { Form } from "react-bootstrap"


const NftsMarket = () => {

    const [nftsData, setNftsData] = useState(DataBase)
    const [nftSearch, setNftSearch] = useState('')

    const handleChange = (e) => {
        setNftSearch(e.target.value)
    }
    return (
        <>
            <div className="marketMain">
                <h1>Market</h1>
                <Form className="searchForm">
                    <input
                        onChange={handleChange}
                        placeholder="Search collections..."
                        className='search'
                        type='search'
                    >
                    </input>
                </Form>
                <div className="container">
                    <div className="row justify-content-center">
                        {DataBase.nftsData.filter(nftss => nftss.collection.toLowerCase().includes(nftSearch)).map((market, i) => (
                            <NftsMarketBox
                                key={i}
                                id={market.id}
                                title={market.title}
                                collection={market.collection}
                                price={market.price}
                                network={market.network}
                                description={market.description}
                                img={market.img}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NftsMarket