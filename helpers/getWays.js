import getClients from "./getPoints";
import ymaps from "yandex-maps";

async function getRouteInfo(startPoint, endPoint) {
    const ymapsApi = await ymaps.load();
    const multiRoute = new ymapsApi.multiRouter.MultiRoute({
      referencePoints: [startPoint, endPoint],
      params: { results: 1 }
    });
  
    const route = await multiRoute.model.getRoutes();
    const activeRoute = multiRoute.getActiveRoute();
    const distance = activeRoute.properties.get("distance");
    const duration = activeRoute.properties.get("duration");
    const points = route.getWayPoints();
  
    console.log('Расстояние: ' + distance.value + 'м.');
    console.log('Время в пути: ' + duration.text);
  
    //Это пока не нужно
    console.log('Точки маршрута:');
    points.each(function(point, index) {
      console.log(index + 1 + '. ' + point.properties.get('text'));
    });
  }
  

const startPoint = [55.751574, 37.573856]; // Красная площадь
const endPoint = [55.763933, 37.620917]; // Московский Кремль

getRouteInfo(startPoint, endPoint);

