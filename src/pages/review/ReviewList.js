import React, { useCallback, useEffect, useState } from 'react'
import '../../scss/review/ReviewList.scss';
import SelectBox from '../../components/ui/SelectBox.js';
import Input from '../../components/ui/lnput/Input.js';
import SearchIcon from '@mui/icons-material/Search';
import CustomPagination from '../../components/ui/CustomPagination.js';
import ReviewListContentList from '../../components/review/ReviewListContentList.js';
import { Button, NativeSelect } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
    change_searchCondition,
    change_searchKeyword
} from '../../slices/ReviewSlice.js';
import { getReview } from '../../apis/ReviewApi.js';

const ReviewList = () => {
    const options = ['최신순', '오래된순', '별점 높은순', '별점 낮은순'];
    const fontSize = '13px';
    const [selectedValue, setSelectedValue] = useState('');

    const dispatch = useDispatch();
    const review = useSelector(state => state.review.reviewDTO);
    const searchCondition = useSelector(state => state.review.searchCondition);
    const searchKeyword = useSelector(state => state.review.searchKeyword);
    const page = useSelector(state => state.review.page);

    const changeSearchCondition = useCallback((e) => {
        dispatch(change_searchCondition(e.target.value));
    }, [dispatch]);

    const changeSearchKeyword = useCallback((e) => {
        dispatch(change_searchKeyword(e.target.value));
    }, [dispatch]);

    const search = useCallback((e) => {
        e.preventDefault();

        dispatch(
            getReview(
                { 
                searchCondition: searchCondition,
                searchKeyword: searchKeyword,
                page: 0,
                sort: selectedValue
                }
            )
        );
    }, [dispatch, searchCondition, searchKeyword, selectedValue]);

    const handleSelectChange = (selectedValue) => {
        setSelectedValue(selectedValue);
    
        let sort;
        switch (selectedValue) {
            case '최신순':
                sort = 'latest';
                break;
            case '오래된순':
                sort = 'oldest';
                break;
            case '별점 높은순':
                sort = 'rating_high';
                break;
            case '별점 낮은순':
                sort = 'rating_low';
                break;
            default:
                sort = 'latest';
        }
        console.log(sort);
    
        dispatch(getReview({ searchCondition: searchCondition, searchKeyword: searchKeyword, page: 0, sort: sort }));
    };

    useEffect(() => {
        dispatch(getReview({ 
            searchCondition: 'all', 
            searchKeyword: '', 
            page: 0,
            sort: 'latest'
        }));
    }, []);

    const changePage = useCallback((e, v) => {
        dispatch(getReview({
            searchCondition: searchCondition,
            searchKeyword: searchKeyword,
            page: parseInt(v) - 1
        }));
    }, [searchCondition, searchKeyword]);

    return (
        <div className='reviewList_container'>
            <form onSubmit={search}>
                <div className='review_box'>
                    <SearchIcon id={'SearchIcon'} />
                    <NativeSelect
                        defaultValue={searchCondition}
                        inputProps={{
                            name: 'searchCondition'
                        }}
                        fullWidth
                        onChange={changeSearchCondition}
                        style={{ display: 'none' }}
                    >
                        <option value='all' >전체</option>
                        <option value='title' >제목</option>
                        <option value='content' >내용</option>
                        <option value='writer' >작성자</option>
                    </NativeSelect>
                    <Input
                        id={'Input'}
                        color={'gray'}
                        placeholder={'검색'}
                        name={'searchKeyword'}
                        value={searchKeyword}
                        onChange={changeSearchKeyword}
                    />
                    <Button
                        color='primary'
                        type='submit'
                        style={{ display: 'none' }}>
                        검색
                    </Button>

                    <div className='SelectBox'>
                        <SelectBox
                        onSelectChange={handleSelectChange}
                        options={options} 
                        fontSize={fontSize}
                        ></SelectBox>
                    </div>
                </div>
                <ReviewListContentList reviews={review.content} />
                <div className='CustomPagination'>
                    {review && <CustomPagination total={review.totalPages} page={page + 1} changePage={changePage}/>}
                </div>
            </form>
        </div>
    );
}

export default ReviewList;