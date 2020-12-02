document.addEventListener('DOMContentLoaded', () => {
    var menu         = document.getElementById("menu"),
        main         = document.getElementById("main"),
        search       = document.getElementById("search"),
        searchInput  = document.getElementById("search-input"),
        topButton    = document.getElementById("top-button");
    // 全局变量，所有的网站数据，用于搜索
    var Data              = new Array();
    // 返回顶部按钮是否隐藏
    var isHiddenTopButton = true;

    // 初始化
    init();

    // 回到顶部事件
    topButton.addEventListener('click', function(e) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 页面滚动事件：控制返回顶部按钮的显示和隐藏
    window.addEventListener('scroll', function(e) {
        let Y = window.scrollY;

        if (Y >= 337 && isHiddenTopButton) {
            topButton.classList.remove("is-hidden");
            isHiddenTopButton = false;
        }

        if (Y < 337 && ! isHiddenTopButton) {
            topButton.classList.add("is-hidden");
            isHiddenTopButton = true;
        }
    });

    // 搜索事件
    search.addEventListener("click", function () {
        if (searchInput.value == '') {
            return;
        }

        let data   = find(searchInput.value);

        let group  = new Object();

        group.name = '搜索结果';
        group.mark = '';
        group.data = data;
        // 隐藏网站列表
        hideGroups();
        // 添加搜索结果
        addGroup(group);

    });

    searchInput.addEventListener("keyup", function (event) {
        event.preventDefault();

        if (searchInput.value == '') {
            init();
            
            return;
        }

        if (event.keyCode === 13) {
            search.click();
        }

        if (event.keyCode === 27) {
            searchInput.value = '';
            init();

            return;
        }
    });

    // 搜索
    function find(text) {
        let config = {
            keys: [
                'name',
                'word'
            ]
        };

        let fuse = new Fuse(Data, config)

        return fuse.search(text);
    }

    // 隐藏网站列表
    function hideGroups() {
        let groupArr = main.children;

        for (let i = 0; i < groupArr.length; i++) {
            let isHidden = groupArr[i].classList.contains("is-hidden");

            if (! isHidden) {
                groupArr[i].classList.add('is-hidden');
            }
        } 
    }

    // 初始化
    function init() {
        main.innerHTML = '';
        menu.innerHTML = '';
        category();
        get(GROUP);
    }

    // 从服务器获取数据
    function get(server) {
        fetch(server)
            .then(function (response) {
                if (response.ok) {
                    let json = response.json();
                    // 全局变量清空
                    Data = []

                    json.then(function(data) {  
                        // 渲染数据
                        draw(data);
                    });
                }
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            });
    }

    // 渲染数据
    function draw(data) {
        data.map(function (group) {
            addGroup(group);
            // 将网站数据添加到全局变量，用于搜索
            let siteArr = group.data;

            siteArr.map(function (site) {
                Data.push(site);
            });
        }); 
    }

    // 导航
    function category() {
        fetch(CATEGORY)
            .then(function (response) {
                if (response.ok) {
                    let json = response.json();

                    json.then(function(data) {  
                        data.map(function (category) {
                            let pathname     = window.location.pathname;
                            let categoryCode = pathname.replace(/\//g, '');
                            let isActive     = '';

                            if (categoryCode == category.mark) {
                                isActive = 'is-active';
                            }

                            if (categoryCode == '' && category.mark == 'recommend') {
                                isActive = 'is-active';
                            }

                            let categoryItem     = createNode(menu, 'li', isActive);
                            let categoryItemLink = createNode(categoryItem, 'a', '', category.name);

                            let link             = '/' + category.mark + '/';

                            if (category.mark == 'recommend') {
                                link             = '/'
                            }

                            categoryItemLink.setAttribute('href', link);
                        }); 
                    });
                }
            })
            .catch(function (error) {
                console.log(JSON.stringify(error));
            });
    }

    // 添加分组
    function addGroup(group) {
        // 先添加分组名称
        addGroupName(group);
        // 再添加网站
        let siteArr = group.data;

        siteArr.map(function (site, i) {
            addGroupSite(site);
        });
    }

    // 添加分组名称
    function addGroupName(group) {
        // 分组名称单独占一行
        let div    = createNode(main, 'div', 'column is-full');
        // 收起 - 展开事件
        div.addEventListener('click', function () {
            let el = this;

            while (el) { 
                el = el.nextElementSibling;

                if (! el || el.classList.contains("is-full")) {
                    break;
                }

                el.classList.toggle('is-hidden');
            }
        });
        // 名称
        let h1 = createNode(div, 'h1', 'title up', group.name);
        // 数量
        createNode(h1, 'span', 'is-size-6 has-text-grey-light', group.data.length);
    }

    // 添加网站
    function addGroupSite(site) {
        if (site.icon === undefined) {
            site.icon = 'far fa-circle';
        }

        let word = '';

        if (site.word !== undefined) {
            word = site.word;
        }

        let html = '<div class="tags has-addons are-medium" title="' + word + '">' +
                        '<span class="tag">' +
                            '<span class="icon is-medium">' +
                                '<i class="' + site.icon + '"></i>' +
                            '</span>' +
                        '</span>' +
                        '<span class="tag is-rounded is-primary"> ' +
                            '<a href="' + site.href + '?utm_source=https://36awesome.com" class="has-text-white" target="_blank">' + site.name + '</a>' +
                        '</span>' +
                    '</div>';
        // 手机端 1 列、平板端 2 列、桌面端 3 列、高分辨端 4 列
        createNode(main, 'div', 'column is-half-tablet is-one-third-desktop is-one-quarter-fullhd', html);
    }

    // 设置导航栏状态
    function activeNav(item) {
        let navArr = menu.children;

        for (let i = 0; i < navArr.length; i++) {
            if (navArr[i].classList.contains(item + "-nav")) {
                if (! navArr[i].classList.contains("is-active")) {
                    navArr[i].classList.add("is-active");
                }
            } else {
                if (navArr[i].classList.contains("is-active")) {
                    navArr[i].classList.remove("is-active");
                }
            }
        }
    }

    // 创建节点
    function createNode(parent, element, className = '', innerHTML = '') {
        let el = document.createElement(element);

        if (className !== '') {
            el.className = className
        }

        if (innerHTML !== '') {
            el.innerHTML = innerHTML
        }

        return parent.appendChild(el);
    }
});