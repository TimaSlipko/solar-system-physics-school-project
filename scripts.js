// TODO: Saturn rings
// TODO: Earth Moon


let scene, cameraPerspective, cameraTop, cameraFree, cameraPlanet, activeCamera, renderer, chosenPlanetId;
const planets = [];
var sun = null;

const SPEED_MULTIPLIER = 15
const DISTANCE_MULTIPLIER = 51
const RADIUS_DIVIDER = 2
const DAY_DURATION_DIVIDER = 1000
   
const planetData = [
    { 
        id: 1,
        info: { 
            name: 'Меркурій',
            text: `Планета Меркурій найближча до Сонця, а також вона одна з небагатьох планет які можна спостерігати у нічному небі неозброєним оком. Досі невідомо хто відкрив Меркурій, проте люди спостерігають за цим небесним тілом вже багато тисяч років.
                Планету названо на честь римського бога Меркурія, послідовника грецького Гермеса та вавилонського Набу.
                Перші згадки про Меркурій сягають шумерських часів близько 3000 років до н.е.
                У Меркурія як і у Венери немає кілець та жодного супутника. Це пов'язано з близькістю цих планет до Сонця.
                Людина яка на Землі важить 80 кг, на Меркурію важитиме 30,4 кг або 38% земної ваги.
                Один сонячний день (час з полудня до полудня на поверхні планети) на Меркурію триває 176 земних діб.
                Хоч Меркурій дуже малий, у нього дуже велика щільність. Це пов'язане з тим що він складається переважно з каміння та важких металів. Більш високу щільність в Сонячній системі має тільки Земля.` 
        },
        texturePath: 'textures/mercury.jpeg',
        radius: 2.440,
        distance: 0.39,
        speed: 47,
        dayDuration: 1408,
        angle: 0,
        cameraOffset: new THREE.Vector3(-10.0, 10, -10.0)
    },
    { 
        id: 2,
        info: { 
            name: 'Венера',
            text: `Венера богиня кохання, якій поклонялись стародавні римляни, а також планета, яку практично щоночі дуже добре видно на зоряному небі. Хоч планету Венеру вважають близнюком Землі, оскільки вона найбільш схожа за розмірами та масою планета, не варто забувати, що на Венері надзвичайно агресивна для людини атмосфера, жахливі кислотні дощі, надвисока температура, постійні виверження вулканів та панують надпотужні вітри.

            Венера не єдина планета в космосі, яку назвали на честь римського божества; проте єдина, яку назвали на честь саме богині.
            За підрахунками вчених діаметр Венери становить 12104 км. Це всього лиш на 638 км менше діаметру Землі.
           В атмосфері Венери переважає вуглекислий газ (близько 96,5%), і його висока концентрація зумовлює парниковий ефект. Сонце розжарює поверхню Венери до середньої температури 462°C.
           Атмосфера на планеті значно щільніша, атмосферний тиск в понад 90 разів вищий ніж на Землі. Через високий тиск на поверхні Венери формуються дуже щільні хмари, які в свою чергу створюють грози та блискавки в тисячі раз потужніші ніж на Землі.
           Завдяки радіолокаційним зображенням вдалось встановити, що на поверхні Венери більше вулканів, ніж на будь-якій іншій планеті в Сонячній системі — понад 1650. Через це у ландшафті Венери переважають гори та скелясті рівнини з застиглої лави.
           ` 
        }, 
        texturePath: 'textures/venus.jpeg',
        radius: 6.052,
        distance: 0.72,
        speed: 35,
        dayDuration: 5832,
        angle: 0,
        cameraOffset: new THREE.Vector3(-10.0, 10, -10.0)
    },
    { 
        id: 3,
        info: { 
            name: 'Земля',
            text: `Земля — це третя планета від Сонця, і єдина планета Сонячної системи на якій є життя. Вона належить до планет земної групи і є найбільшою серед них. 
            Незвичним є факт, що всі планети Сонячної системи крім нашої носять імена з грецької та римської міфології.
             Земля, як планета з'явилась понад 4,5 мільярдів років тому. До появи життя на планеті від народження Землі пройшло ще декілька тисяч мільйонів років і відносно недавно, за геологічними мірками, близько чотирьох мільйонів років тому з'явились люди.
            З астрономічної точки зору, Земля займає найбільш вдале місце в космосі для зародження і підтримання життя. Навколосонячна орбіта Землі знаходиться в межах зони з оптимальною температурою для існування води у рідкому вигляді, а це на думку вчених є обов'язковою умовою для існування форм життя.
            За різними підрахунками вчених в нашій галактиці Чумацький Шлях є понад 2 мільярди планет, схожих на Землю, це дає надію сподіватись, що можливо ми не самотні у безмежному Всесвіті.
            Землетрус поблизу Японії 2011 року збільшив швидкість обертання Землі та тим самим скоротив день на 1,8 мікросекунди.
            ` 
        },
        texturePath: 'textures/earth.jpeg',
        radius: 6.371,
        distance: 1.00,
        speed: 30,
        dayDuration: 24,
        angle: 0,
        cameraOffset: new THREE.Vector3(-10.0, 10, -10.0)
    },
    { 
        id: 4,
        info: { 
            name: 'Марс',
            text: `Марс найбільш вивчена планета в Сонячній системі після Землі, сьогодні він розглядається вченими, як потенційна для колонізації людством планета. Марс завжди був об'єктом людської цікавості та він часто з'являється в фантастичних фільмах та книжках.
            Названа на честь Марса — давньоримського бога війни.
            Істина природа забарвлення планети пов'язана з великою кількістю оксиду заліза на його поверхні. Іншими словами на Марсі така велика кількість заліза, що планета буквально покрита іржею. Відтінок планети змінюється залежно від пір року, яких на Марсі також чотири.
            Марс не зовсім ідеально сферичної форми і дещо сплюснутий, як і Земля, на полюсах. Це невелике сплющення також зумовлене обертання планети навколо своєї осі.
            Марс — четверта та остання планета в Сонячній системі з кам’янистою поверхнею, решта планет, які знаходяться на більш віддалених від Сонця орбітах за своєю структурою газоподібні.
            Кратери на Марсі, які більші ніж 60 км в діаметрі, названі на честь померлих вчених, письменників та видатних людей, що внесли свій вклад у вивчення Марса.
            Оскільки супутники Марса неправильної форми вчені допускають, що вони можуть бути астероїдами, які Марс захватив своєю гравітацією.
            ` 
        },
        texturePath: 'textures/mars.jpeg',
        radius: 3.390,
        distance: 1.52,
        speed: 24,
        dayDuration: 25,
        angle: 0,
        cameraOffset: new THREE.Vector3(-10.0, 10, -10.0)
    },
    { 
        id: 5,
        info: { 
            name: 'Юпітер',
            text: `Планета Юпітер є в два з половиною рази більша, ніж всі інші планети Сонячної системи, разом узяті. Вона складається в основному з газів і тому відноситься до газових гігантів.
            Назва Юпітера походить від імені давньоримського верховного бога-громовержця.
            Першими хто описав свої спостереження за Юпітером були стародавні вавилоняни приблизно в сьомому столітті до нашої ери.
            Велика червонувата пляма на поверхні Юпітера насправді величезний шторм, який вирує близько 350 років. Територія шторму настільки величезна, що можливо помістити усередині нього три планети за розміром як Земля.
            Верхні шари атмосфери Юпітера складаються з кристалів сірки та аміаку. Нижче розміщені шари газоподібного та рідкого водню. Ядро утворене з криги, каміння металу.
            Супутник Юпітера Ганімед є найбільшим в Сонячній системі. Ганімед за розмірами більший ніж планета  Меркурій.
            Загалом на дослідження Юпітера було відправлено вісім космічних апаратів.
            ` 
        },
        texturePath: 'textures/jupiter.jpeg',
        radius: 69.911,
        distance: 5.20,
        speed: 13,
        dayDuration: 10,
        angle: 0,
        cameraOffset: new THREE.Vector3(-50, 50, -50)
    },
    { 
        id: 6,
        info: { 
            name: 'Сатурн',
            text: `Сатурн найбільш відомий за свою казкову систему кілець, також це найдальша планета від сонця, яку можна спостерігати в нічному небі неозброєним оком. Сатурн як і Юпітер є газовим гігантом і складається з суміші газів водню, гелію та метану.
            Планета отримала свою назву від імені давньоримського бога родючості.
             Оскільки Сатурн п'ятий за яскравістю об'єкт в Сонячній системі він був відомий ще древнім вавилонянам. 
            Через низьку щільність та високу швидкість обертання Сатурн приплюснутий на полюсах. Його полярний діаметр становить менше ніж 90% від екваторіального.
            У верхніх шарах Сатурн в основному складається з льоду аміаку, під яким знаходяться хмари з водяної криги. Ближче до ядра Сатурн складається з крижаної суміші сірки та водню, а глибоко всередині саме ядро утворене з металічного водню.
            Всі газові гіганти в нашій Сонячній системі мають кільця, але Сатурну належать найбільші. Хоч кільця простягаються на понад 120 000 км від планети, як не дивно їх товщина становить від десяти метрів і до одного кілометра. Першим кільця виявив Галілео Галілей 1610.
            Сатурн відвідали чотири космічні апарати: Pioneer 11, Voyager 1 і 2 та космічний апарат Кассіні — Гюйгенс (англ. Cassini-Huygens). Кассіні продовжує досліджувати Сатурн та регулярно надсилає величезну кількість даних про саму планету, її супутники та кільця.
            ` 
        },
        texturePath: 'textures/saturn.jpeg',
        radius: 58.232,
        distance: 9.54,
        speed: 9.7,
        dayDuration: 11,
        angle: 0,
        cameraOffset: new THREE.Vector3(-50.0, 50, -50.0)
    },
    { 
        id: 7,
        info: { 
            name: 'Уран',
            text: `Уран — сьома від Сонця велика планета Сонячної системи, що належить до планет-гігантів.
            Назва «Уран» походить від імені давньогрецького бога, який уособлює небо та є дідом Зевса.
            Офіційним першовідкривачем Урана в 1781 році є астроном Фрідріх Вільям Гершель. Це перша планета відкрита людиною за допомогою телескопа. Коли Гершель виявив у зоряному небі невідомий доти об'єкт він спочатку подумав, що це комета.
            У Китаї, Японії, та Кореї назва планети Уран перекладається як «король зоряного неба».
            Уран має унікальну вісь обертання, його північний і південний полюси лежать там, де у більшості планет Сонячної системи, знаходиться екватор. Таким чином він «котиться» як куля для боулінгу, а не «вертиться» як дзига.
            Як і в інших газових гігантів, в атмосфері Урана переважають водень та гелій. Нижче, під оболонкою газу є зледеніла мантія з аміачного льоду, яка вкриває кам'яне ядро. У верхніх шарах атмосфера складається з кристалів води аміаку, та зледенілого метану, які і надають планеті її блідо-блакитний колір.
            Уран має 13 кілець і згідно досліджень, вони з'явились вже після формування планети. Вчені вважають, що кільця є залишком, розірваного силами тяжіння або зруйнованого метеоритом, супутника. Зовнішнє кільце синього кольору, наступне червоне, а всі інші сірого. Два зовнішніх кільця виявили лише в 2003 та 2005 роках завдяки знімкам отриманих з телескопа Габбл.
            ` 
        },
        texturePath: 'textures/uranus.jpeg',
        radius: 25.362,
        distance: 19.22,
        speed: 6.8,
        dayDuration: 17,
        angle: 0,
        cameraOffset: new THREE.Vector3(-50.0, 50, -50.0)
    },
    { 
        id: 8,
        info: { 
            name: 'Нептун',
            text: `Нептун – восьма за віддаленістю від Сонця планета Сонячної системи. 
            Названа на честь давньоримського бога морів Нептуна. 
            На думку вчених Нептун сформувався значно ближче до Сонця на ранніх етапах історії Сонячної системи та згодом під впливом гравітаційних сил він віддалився до його сьогоднішнього положення.
            Атмосфера планети складається з водню та гелію, а також до її складу входить метан. Оскільки газ метан поглинає червоне світло Нептун має насичений синій колір.
            Нептун має тоненькі кільця, які складаються з дрібних частинок криги та пилу.
            На поверхні Нептуна дуже активний і нестабільний клімат. Тут панують шалені вітри та неймовірно низькі температури. У верхніх шарах атмосфери швидкість вітру часто перевищує 600 метрів на секунду.
            Нептун має аж 14 супутників найцікавішим серед яких є Тритон, заморожений світ на поверхні якого постійно відбуваються крижані виверження азоту. На думку вчених це найхолодніший світ в Сонячній системі.
            ` 
        },
        texturePath: 'textures/neptune.jpeg',
        radius: 24.622,
        distance: 30.06,
        speed: 5.4,
        dayDuration: 16,
        angle: 0,
        cameraOffset: new THREE.Vector3(-30.0, 30, -30.0)
    }
];

window.onload = function() {

    // Initialize the scene, camera, and renderer
    function init() {

        // Create the scene
        scene = new THREE.Scene();

        scene.background = new THREE.Color('rgb(46, 0, 69)');
        if (window.location.protocol === 'https:') {
            scene.background = new THREE.TextureLoader().load('textures/space.webp')

            const targetAspect = window.innerWidth / window.innerHeight;
            const imageAspect = 9725  / 4862;
            const factor = imageAspect / targetAspect;
            // When factor larger than 1, that means texture 'wilder' than target。 
            // we should scale texture height to target height and then 'map' the center  of texture to target， and vice versa.
            scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
            scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
            scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
            scene.background.repeat.y = factor > 1 ? 1 : factor;
        }

        // Create the cameras
        cameraPerspective = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
        cameraPerspective.position.set(0, 500, 1400);
        cameraPerspective.rotation.set(-0.5, 0, 0)
        
        cameraTop = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
        cameraTop.position.set(0, 2100, 0);
        cameraTop.rotation.set(-1.565, 0, 0)

        cameraFree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 5000);
        cameraFree.position.set(70, 50, 0);

        cameraPlanet = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 2, 5000);

        setCamera('perspective')

        // Create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Create controls
        var controls = new THREE.OrbitControls( cameraFree, renderer.domElement );
        controls.update();

        var light = new THREE.AmbientLight(0x404040);
        scene.add(light);

        // Create the sun
        const sunGeometry = new THREE.SphereGeometry(5, 48, 48);
        let sunMaterial = new THREE.MeshBasicMaterial( { wireframe: true } ); 
        if (window.location.protocol === 'https:') {
            sunMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('textures/sun.jpg') });
        }
        sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Create the planets
        for (let i = 0; i < planetData.length; i++) {
            const planetInfo = planetData[i];
            const planetGeometry = new THREE.SphereGeometry( planetInfo.radius / RADIUS_DIVIDER, 48, 48 ); 
            
            let planetMaterial = new THREE.MeshBasicMaterial( { wireframe: true } ); 
            if (window.location.protocol === 'https:') {
                planetMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(planetInfo.texturePath) }); 
            }
            
            const planet = new THREE.Mesh( planetGeometry, planetMaterial ); scene.add( planet );
            planet.position.set(planetInfo.distance, 0, 0);

            planets.push({
                id: planetInfo.id,
                mesh: planet,
                speed: planetInfo.speed,
                angle: getRandomInt(360),
                distance: planetInfo.distance,
                dayDuration: planetInfo.dayDuration,
                cameraOffset: planetInfo.cameraOffset
            });

            scene.add(planet);
        }
    }

    // Animate the scene
    function animate() {

        // Update the position of sun
        sun.rotation.y += 0.001

        // Update the positions of the planets
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i]
            planet.mesh.rotation.y += planet.dayDuration / DAY_DURATION_DIVIDER

            const pos = calculatePointInCircle(planet.distance * DISTANCE_MULTIPLIER, planet.angle)

            planet.angle = calculatePlanetAngle(planet)

            planet.mesh.position.set(pos.x, 0, pos.y)

            if (planet.id === chosenPlanetId) {
                const planetPosition = new THREE.Vector3();
                planet.mesh.getWorldPosition(planetPosition);
                cameraPlanet.position.copy(planetPosition).add(planet.cameraOffset);
                cameraPlanet.lookAt(planetPosition)
            }
        }

        requestAnimationFrame(animate);
        renderer.render(scene, activeCamera);
    }

    function calculatePointInCircle(radius, angle) {
        // Convert the angle from degrees to radians
        var radians = angle * (Math.PI / 180);
        
        // Calculate the new position
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        
        // Return the new position as an object
        return { x: x, y: y };
    }

    function calculatePlanetAngle(planet) {
        if (planet.angle >= 360) {
            return 0
        } else {
            return planet.angle + (planet.speed / 1000 * SPEED_MULTIPLIER)
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    init()
    animate()
};


function setCamera(pos) {
    selectedCameraEl = document.getElementById('selected-camera')
    aboutPlanetEl = document.getElementById('about-planet')

    switch (pos) {
        case 'top':
            selectedCameraEl.innerHTML = 'Згори'
            activeCamera = cameraTop
            aboutPlanetEl.style.display = 'none'
            break
        case 'perspective':
            selectedCameraEl.innerHTML = 'Перспектива'
            activeCamera = cameraPerspective
            aboutPlanetEl.style.display = 'none'
            break
        case 'free':
            selectedCameraEl.innerHTML = 'Вільна'
            activeCamera = cameraFree
            aboutPlanetEl.style.display = 'none'
            break
        case 'planet':
            selectedCameraEl.innerHTML = 'Планета'
            activeCamera = cameraPlanet
            aboutPlanetEl.style.display = 'block'
            break
    }
}

function choosePlanet(id) {
    chosenPlanetId = id

    const planet = planetData.find(o => o.id === id);

    let nameEl = document.getElementById('planet-name')
    let infoEl = document.getElementById('planet-info')

    nameEl.innerHTML = planet.info.name
    infoEl.innerHTML = planet.info.text

    setCamera('planet')
}