import React from 'react';
import style from './Paginator.module.css';
import cn from "classnames";

const Paginator = (props) => {
    const changeCountPagesOnPage = (currentPage, totalUsersCount, pageSize) => {
        let pagesCount = Math.ceil(totalUsersCount / pageSize);
        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let left = currentPage - 1;
        let right = currentPage + 1;
        let center = currentPage;

        if (center === 1) return [center, right, pages[pages.length - 1]];
        else if (center === pages[pages.length - 1]) return [pages[0], left, center]
        else return [pages[0], left, center, right, pages[pages.length - 1]];
    }
    const pages = changeCountPagesOnPage(props.currentPage, props.totalUsersCount, props.pageSize);

    return pages.map((p) => {
        return <span onClick={() => {
            props.onPageChanged(p)
        }} className={cn(style.pages, {[style.selectedPage]: props.currentPage === p})}>{p}</span>
    })
}

export default Paginator;