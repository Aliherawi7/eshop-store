import React, { useEffect, useRef, useState } from 'react'
import "./ProductDetails.css"
import Button from '../../UI/Button/Button'
import { useParams } from 'react-router-dom'
import Loading from '../../UI/Loading/Loading'
import DetailsPane from './productDetailPane/DetailsPane'
import { useStateValue } from '../../../StateProvider'
import RateStar from '../Rate-Star/RateStar'
import { actions } from '../../../reducer'
import { BytesToFile } from '../../Utils/BytesToFile'
import { toast } from 'react-toastify'
import Modal from '../../UI/modal/Modal'
import Product from '../Product/Product'

const ProductDetails = () => {
    const [{ basket }, dispatch] = useStateValue()
    const [product, setProduct] = useState();
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [productImage, setProductImage] = useState('');
    const [showModal, setShowModal] = useState(false)
    const sliderRef = useRef();
    const sliderItemRef = useRef();
    let producstElement;
    const { id } = useParams()
    useEffect(() => {
        window.scrollTo(0, 0)

        const getProductInfo = () => {
            fetch('http://localhost:8080/api/products/' + id).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(data => {
                console.log(data)
                data.images = data.images.map((item) => {
                    return BytesToFile(item, { contentType: "image/png" });
                })
                setProduct(data);
                setProductImage(data.images[0])
                getRalatedProducts(data.category);

            })
        }
        getProductInfo();
        function getRalatedProducts(category) {
            fetch('http://localhost:8080/api/products/find?category=' + category).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(relatedProducts => {

                relatedProducts.map(item => {
                    item.images[0] = BytesToFile(item.images[0], { contentType: "image/png" })
                    return item;
                })
                console.log(relatedProduct)
                setRelatedProduct(relatedProducts);
            })
        }


    }, [id])

    const addToBasket = () => {
        const index = basket.findIndex(item => {
            return item.id == id;
        })

        // if there are not enough product in depot
        if (index >= 0 && basket[index].quantity >= product.quantityInDepot) { return; }

        if (index >= 0) {
            dispatch({
                type: actions.CHANGE_QUANTITY,
                item: {
                    id: id,
                    index: index,
                    quantity: basket[index].quantity + 1
                }
            })
            return;
        }
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                name: product.name,
                image: product.images[0],
                price: product.price,
                rating: product.rating,
                id: id,
                quantity: 1
            }
        })
    }

    const addToFavorite = () => {
        fetch("http://localhost:8080/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ productId: product.productId })
        }).then(res => {
            if (res.ok) {
                toast.success("successfully added", {
                    position: 'bottom-right'
                });
            }
        })
    }

    function slideTo(direction) {
        console.dir(sliderItemRef.current)
        const cardWidth = sliderItemRef.current.offsetWidth + 20;
        if (direction === "left") {
            sliderRef.current.scroll(sliderRef.current.scrollLeft - cardWidth, 0)
        } else if (direction === "right") {
            sliderRef.current.scroll(sliderRef.current.scrollLeft + cardWidth, 0)
        }
    }

    function modalSlide(previosImage, direction){
        const index = product?.images.findIndex(item => {
            return item == previosImage
        })
        switch(direction){
            case 'left':
                setProductImage(product.images[index - 1 < 0  ? product.images.length-1 : index-1]);
                break;
            case 'right':
                setProductImage(product.images[index + 1 == product.images.length ? 0 : index+1]);
                break
        }
        
    }

    //if data have been loaded from server
    if (product) {
        producstElement = (
            <div className="fade-in">

                <div className="product_details">
                    <section className='product_images'>
                        <Button btnType="transparent zoom-btn" click={() => setShowModal(!showModal)} ><i className='bi bi-zoom-in'></i></Button>
                        <img src={productImage} className="product_image" alt={product.name} />
                        <Modal show={showModal} ModalClose={() => setShowModal(!showModal)}>
                            <span className='slide-left' onClick={() => modalSlide(productImage, 'left')}> <i className='bi bi-chevron-left'></i></span>
                            <img src={productImage} alt={product.name} />
                            <span className='slide-left right' onClick={() => modalSlide(productImage, 'right')}><i className='bi bi-chevron-right'></i></span>
                        </Modal>
                        <div className='different_sides align_center'>
                            {product.images.map((item) => {
                                return (
                                    <div className={'image_side'+ (item == productImage ? ' active': '')} onClick={()=> setProductImage(item)}>
                                        <img src={item} alt={product.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    <div className="product-info border-bottom">
                        <div className='border-bottom'>
                            <p>{product.category}</p>
                            <h3 className="product-title">{product.name}</h3>
                            <div className='price-rate border-bottom'>
                                <div className='product-price'>
                                    {product.discount ?
                                        <div className='before-discount'>
                                            <i className='bi bi-currency-dollar'></i>{product.price}
                                        </div>
                                        : ""
                                    }
                                    <div className='after-discount'>
                                        <i className='bi bi-currency-dollar'></i>
                                        {product.price - (product.price * product.discount / 100)}
                                    </div>
                                    <span className='discount-value'>{product.discount ? product.discount + "% " : ""}Discount</span>
                                </div>
                                <div className='rate-review align_center'>
                                    <RateStar rate={product.rate} size={"large"} />
                                    <span>{product.reviews} Reviews</span>
                                </div>

                            </div>
                            <p className="product-description border-bottom">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod nisi velit accusantium corporis doloremque. At laboriosam eum architecto ullam, eos sed provident blanditiis deleniti sapiente et ipsa. Totam, explicabo fugit?</p>
                            <Button btnType="outline" click={addToBasket}>
                                Add To Cart
                            </Button>
                            <Button btnType="outline" click={addToFavorite}>
                                Add To Favorite
                            </Button>
                        </div>
                        <DetailsPane dataSheet={product} description={product.description} />
                    </div>
                </div>
                <section className='related_products'>
                    <h2 className='section-title'>
                        <span style={{ color: "var(--mainColor)" }}>Related</span> Products
                    </h2>
                    <div className='related_product_container' >
                        <span className='scroll_btn' onClick={() => slideTo("left")}><i className='bi bi-chevron-left'></i></span>
                        <div className='related_product_slider' ref={sliderRef} draggable>
                            {relatedProduct.map(item => {
                                return <Product
                                    id={item.productId}
                                    image={item.images[0]}
                                    name={item.name}
                                    price={item.price}
                                    rating={item?.rate}
                                    key={item.productId}
                                    color={item.color}
                                    discount={item.discount}
                                    customeRef={sliderItemRef}
                                />
                            })}
                        </div>

                        <span className='scroll_btn right' onClick={() => slideTo("right")}><i className='bi bi-chevron-right'></i></span>
                    </div>
                </section>

            </div>
        )
    } else {
        //if data have not been loaded from server
        producstElement = (
            <Loading />
        )
    }
    return producstElement

}

export default ProductDetails