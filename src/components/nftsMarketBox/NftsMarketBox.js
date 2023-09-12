import { Link } from "react-router-dom";
import "../nftsMarketBox/NftsMarketBox.scss"

const NftsMarketBox = (props) => {

    const price = (props.price / 1500)
    const date = new Date();

    return (
        <>
            <div class="col-md-3 productBox">
                <Link className="boxLink" to="nftsMarketInfo">
                    <div class="product-grid">
                        <div class="product-image">
                            <a class="image">
                                <img
                                    className="cf_image pic-1"
                                    src={props.img}
                                    alt="image"
                                />
                            </a>
                        </div>
                        <div class="product-content">
                            <h3 className="product-title">{props.title}</h3>
                            <hr className="line"></hr>
                            <h3 className="product-collection">{props.collection}<span className="product-network">{props.network}</span></h3>
                            <h3 className="price"><span className="product-price-cripto"><img className="product-price-img" src="https://www.iconpacks.net/icons/2/free-cryptocurrency-coin-icon-2422-thumb.png"></img>{price.toFixed(3)} {props.network} <br></br><span className="product-price-dolers">= {props.price} $</span></span>Price</h3>
                            <small className="text-muted">
                                Created: {date.toLocaleDateString("lt-LT")}
                            </small>
                        </div>
                    </div>
                </Link>
            </div>
        </>

    )
}

export default NftsMarketBox