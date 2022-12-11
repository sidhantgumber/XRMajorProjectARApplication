import './style/main.css'
import * as THREE from 'three'
// import { FlatShading } from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"

const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
console.log("Changes in git");

window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)




// var refCar;
// const loader = new GLTFLoader().setPath("models/");
// loader.load('CarModel.glb' , function OnLoad(car){
// console.log("adding");
// car.scene.scale.set(0.1,0.1,0.1);
// car.scene.position.set(0,0,0);
// car.castShadow = true;
// refCar = car.scene;
// console.log(refCar)
// scene.add(car.scene);
// });

var table;
loader.load('table.glb', function(gltf){

    scene.add(gltf.scene);
   // gltf.scene.scale.set(0.1,0.1,0.1);
    gltf.scene.position.set(0,0,4);
    table = gltf.scene;
    gltf.scene.rotation.set(0,Math.PI/2,0);
    gltf.castShadow = true;
})


const lightColor = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(lightColor , intensity);
light.position.set(-1, 10, 4);
scene.add(light);
light.castShadow = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.content')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
// controls
const controls = new OrbitControls(camera, renderer.domElement);



const animate = () =>
{
    // Update
    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate()