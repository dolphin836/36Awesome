document.addEventListener('DOMContentLoaded', () => {
    var menu         = document.getElementById("menu"),
        main         = document.getElementById("main"),
        search       = document.getElementById("search"),
        searchInput  = document.getElementById("search-input"),
        topButton    = document.getElementById("top-button");
    // 全局变量，所有的网站数据，用于搜索
    var Data = new Array();
    // 返回顶部按钮是否隐藏
    var isHiddenTopButton = true;
    // 分组标题的坐标，用于滚动时导航栏的定位
    var titleY = new Array();
    // 初始化
    init();
    // 初始化滚动事件
    new SmoothScroll('a[href*="#"]', {
        updateURL: false,
        offset: 280
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
        // 小于 200 
        if (Y <= 150) {
            activeNav(titleY[0][0]);
        } else {
            titleY.map(function (item) {
                if (Y + 20 >= item[1]) {
                    activeNav(item[0]);
                }
            });
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
        // 从本地读取数据
        let data  = store.get('data');
        // 得到 Json 文件的 Hash 值
        let sHash = getHash();
        // 得到本地存储的 Hash 值
        let cHash = store.get('hash');
        // 从本地读取数据失败，从服务器获取数据
        if (data === undefined || cHash === undefined || cHash !== sHash) {
            // 从服务器获取数据
            get(GROUP);
        } else {
            // 渲染数据
            draw(data);
        }
    }

    // 从服务器获取数据
    function get(server) {
        let sHash = getHash();
        // 将数据 Hash 值存储到本地
        if (sHash) {
            store.set('hash', sHash);
        }
        
        fetch(server)
            .then(function (response) {
                if (response.ok) {
                    let json = response.json();
                    // 全局变量清空
                    Data = []

                    json.then(function(data) {  
                        // 将数据存储到本地
                        store.set('data', data);
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
            addMenu(group.name, group.mark);
            addGroup(group);
            // 将网站数据添加到全局变量，用于搜索
            let siteArr = group.data;

            siteArr.map(function (site) {
                Data.push(site);
            });
        }); 
    }

    // 得到 Json 文件的 Hash 值
    function getHash() {
        let strArr = GROUP.split('-');

        if (strArr.length == 1) {
            return false;
        }

        let hash = strArr[1].split('.');

        return hash[0];
    }

    // 添加快捷导航
    function addMenu(name, mark) {
        let li = createNode('li');
        // 第一个
        let navArr   = menu.children;

        if (navArr.length === 0) {
            li.className = mark + '-nav' + ' is-active';
        } else {
            li.className = mark + '-nav';
        }

        let a  = createNode('a');

        a.innerHTML = name;
        a.href      = '#' + mark;

        append(li, a);
        append(menu, li);
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
        let h1 = createNode('h1');

        h1.className = 'title up';
        h1.innerHTML = group.name;
        h1.id        = group.mark;
        // 收起 - 展开事件
        h1.addEventListener('click', function () {
            let el = this;

            while (el) { 
                el = el.nextElementSibling;

                if (! el || el.nodeName == 'H1') {
                    break;
                }

                el.classList.toggle('is-hidden');
            }
        });
        // 数量
        let span       = createNode('span');
        span.className = 'is-size-6 has-text-grey-light';
        span.innerHTML = group.data.length;

        append(h1, span);

        // 分组名称单独占一行
        let div       = createNode('div');
        div.className = 'column is-full';
        append(div, h1);
        // 链接到主节点
        append(main, div);
        // 记录分组标题的 Y 坐标
        let Y = [group.mark, h1.offsetTop];
        titleY.push(Y);
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

        if (site.mark !== undefined) {
            word += '\n快捷键：' + site.mark;
        }

        let html = '<div class="tags has-addons are-medium" title="' + word + '">' +
                        '<span class="tag">' +
                            '<span class="icon is-medium">' +
                                '<i class="' + site.icon + '"></i>' +
                            '</span>' +
                        '</span>' +
                        '<span class="tag is-rounded is-primary"> ' +
                            '<a href="' + site.href + '" class="has-text-white" target="_blank">' + site.name + '</a>' +
                        '</span>' +
                    '</div>';

        let column  = createNode('div');
        // 手机端 1 列、平板端 2 列、桌面端 3 列、高分辨端 4 列
        column.className = 'column is-half-tablet is-one-third-desktop is-one-quarter-fullhd';
        column.innerHTML = html;
        // 链接到主节点
        append(main, column);
        // 绑定键盘快捷键
        if (site.mark !== undefined) {
            Mousetrap.bind(site.mark, function() {
                window.open(site.href);
            });
        }
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
    function createNode(element) {
        return document.createElement(element);
    }

    // 追加节点
    function append(parent, el) {
        return parent.appendChild(el);
    }
});