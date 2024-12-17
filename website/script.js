document.addEventListener('DOMContentLoaded', () => {
    const imageScroll = document.querySelector('.image-scroll');
    const images = document.querySelectorAll('.image'); // 모든 이미지 선택
    const brandName = document.querySelector('.brand-name'); // "Dewroot" 요소 선택

    let isDragging = false;
    let startX, scrollLeft;

    // 드래그 스크롤
    imageScroll.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - imageScroll.offsetLeft;
        scrollLeft = imageScroll.scrollLeft;
    });

    imageScroll.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    imageScroll.addEventListener('mouseup', () => {
        isDragging = false;
    });

    imageScroll.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - imageScroll.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조정
        imageScroll.scrollLeft = scrollLeft - walk;
    });

    // 마우스 휠 스크롤
    imageScroll.addEventListener('wheel', (e) => {
        e.preventDefault(); // 세로 스크롤 방지
        imageScroll.scrollLeft += e.deltaY * 2; // 가로 스크롤
    });

    // 이미지 클릭 이벤트
    images.forEach((image) => {
        image.addEventListener('click', () => {
            if (image.classList.contains('expanded')) {
                // 이미지 축소 및 텍스트 복원
                image.classList.remove('expanded');
                brandName.classList.remove('shrink');
            } else {
                // 기존 확대 이미지 축소
                images.forEach((img) => img.classList.remove('expanded'));
                // 선택 이미지 확대 및 텍스트 축소
                image.classList.add('expanded');
                brandName.classList.add('shrink');

                // 클릭한 이미지를 왼쪽으로 정렬
                const imageLeft = image.offsetLeft;
                const imageWidth = image.offsetWidth;
                const scrollContainerWidth = imageScroll.offsetWidth;
                const scrollWidth = imageScroll.scrollWidth;

                // 스크롤 위치 계산
                const scrollPosition = Math.max(
                    0,
                    Math.min(
                        imageLeft - (scrollContainerWidth - imageWidth) / 2,
                        scrollWidth - scrollContainerWidth
                    )
                );

                imageScroll.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // 빈 공간 클릭 시 모든 요소 복원
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.image-container')) {
            images.forEach((img) => img.classList.remove('expanded'));
            brandName.classList.remove('shrink');
        }
    });
});
