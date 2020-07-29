import React from 'react';
import Footer from '../Component/Footer';

function Home() {
  return (
    <div className="awesome">
      <div className="app">
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-offset-3 is-6">
                <article className="message is-success">
                  <div className="message-body is-radiusless">
                    <p className="is-4 title">
                      <a href="#" style={{ textDecoration: "none" }}>时间字符串与 Unix 时间戳互转</a>
                    </p>
                    <p className="is-6 mb-2 subtitle has-text-grey has-text-weight-light">Transform Unix Time Stamp And Data Time</p>
                    <div className="tags are-normal">
                      <span className="tag is-link is-light"># 娱乐</span>
                      <span className="tag is-link is-light"># 社交</span>
                      <span className="tag is-link is-light"># 图片</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Home;