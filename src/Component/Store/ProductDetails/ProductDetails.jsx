import React, { useEffect, useRef, useState } from 'react'
import "./ProductDetails.css"
import Button from '../../UI/Button/Button'
import { useParams } from 'react-router-dom'
import Loading from '../../UI/Loading/Loading'
import DetailsPane from './productDetailPane/DetailsPane'
import { useStateValue } from '../../../StateProvider'
import RateStar from '../Rate-Star/RateStar'
import { actions } from '../../../reducer'
import { toast } from 'react-toastify'
import Modal from '../../UI/modal/Modal'
import ApiUrls from "../../../Constants/ApiUrls"
import useFetch from '../../../Hook/useFetch'
import RelatedProducts from '../RelatedProducts/RelatedProducts'
import NotFound from "../../Pages/NotFoundPage/NotFound"

const ProductDetails = () => {
    const { id } = useParams()
    const [{ basket }, dispatch] = useStateValue()
    const [product, setProduct] = useState();
    const { data, error, loading } = useFetch(ApiUrls.hostName + ApiUrls.products.getProduct + id);
    const [showModal, setShowModal] = useState(false)
    const [productImage, setProductImage] = useState("");

    let productsElement;


    useEffect(() => {
        window.scrollTo(0, 0)
        if (data) {
            setProductImage(data.images[0])
        }
    }, [data, id])

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
                name: data.name,
                image: data.images[0],
                price: data.price,
                rating: data.rating,
                id: id,
                quantity: 1
            }
        })
    }

    const addToFavorite = () => {
        console.log(id)
        fetch("http://localhost:8080/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ productId: id })
        }).then(res => {
            if (res.ok) {
                toast.success("successfully added", {
                    position: 'bottom-right'
                });
            }
        })
    }

    function modalSlide(previosImage, direction) {
        const index = data?.images.findIndex(item => {
            return item == previosImage
        })
        switch (direction) {
            case 'left':
                setProductImage(data.images[index - 1 < 0 ? data.images.length - 1 : index - 1]);
                break;
            case 'right':
                setProductImage(data.images[index + 1 == data.images.length ? 0 : index + 1]);
                break
        }

    }

    //if data is loading from server
    if (loading) {
        productsElement = (
            <Loading />
        )
    }

    if (error) {
        productsElement = <NotFound />
    }

    //if data have been loaded from server
    if (data) {
        productsElement = (
            <div className="fade-in">
                <div className="product_details">
                    <section className='product_images'>
                        <Button btnType="transparent zoom-btn" click={() => setShowModal(!showModal)} ><i className='bi bi-zoom-in'></i></Button>
                        <div className='product_image_container'>
                            <img src={productImage} className="product_image" alt={data?.name} />
                        </div>
                        <Modal show={showModal} ModalClose={() => setShowModal(!showModal)}>
                            <span className='slide-left' onClick={() => modalSlide(productImage, 'left')}> <i className='bi bi-chevron-left'></i></span>
                            <img src={productImage} alt={data?.name} />
                            <span className='slide-left right' onClick={() => modalSlide(productImage, 'right')}><i className='bi bi-chevron-right'></i></span>
                        </Modal>
                        <div className='different_sides align_center'>
                            {data?.images.map((item) => {
                                return (
                                    <div key={item} className={'image_side' + (item == productImage ? ' active' : '')} onClick={() => setProductImage(item)}>
                                        <img src={item} alt={data.name} />
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                    <div className="product-info border-bottom">
                        <div className='border-bottom'>
                            <p>{data?.category}</p>
                            <h3 className="product-title">{data?.name}</h3>
                            <div className='price-rate border-bottom'>
                                <div className='product-price'>
                                    {data.discount ?
                                        <div className='before-discount'>
                                            <i className='bi bi-currency-dollar'></i>{data.price}
                                        </div>
                                        : ""
                                    }
                                    <div className='after-discount'>
                                        <i className='bi bi-currency-dollar'></i>
                                        {data.price - (data.price * data.discount / 100)}
                                    </div>
                                    <span className='discount-value'>{data.discount ? data.discount + "% " : ""}Discount</span>
                                </div>
                                <div className='rate-review align_center'>
                                    <RateStar rate={data.rate} size={"large"} />
                                    <span>{data.reviews} Reviews</span>
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
                        <DetailsPane dataSheet={data} description={data.description} />
                    </div>
                </div>
                <RelatedProducts category={data?.category} />
            </div>
        )

    }

    return (
        <div>{productsElement}</div>
    )

}

export default ProductDetails