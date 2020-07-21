import React from 'react';

function Footer () {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p className="mb-2">&copy; { new Date().getFullYear() } <a href="https://www.36awesome.com">36Awesome</a> BY <a href="https://www.haibing.site" target="_blank" rel="noopener noreferrer">海兵大侠</a></p>
                <p className="is-size-7">
                    <a href="http://www.beian.miit.gov.cn" className="has-text-grey" target="_blank" rel="noopener noreferrer">苏 ICP 备 15001763 号 - 4</a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;