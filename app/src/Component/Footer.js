import React from 'react';

function Footer (props) {
    return (
        <footer>
            <div className="container">
                <div className="has-text-centered">
                    <p className="is-size-6">&copy; {new Date().getFullYear()} <a className={ props.firstLinkColor } href="https://36awesome.cn">36awesome.cn</a></p>
                    <p className="is-size-7">
                        <a href="http://www.beian.miit.gov.cn" className={ props.secondLinkColor } target="_blank" rel="noopener noreferrer">苏 ICP 备 15001763 号 - 4</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;