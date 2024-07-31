import {registerApplication, start} from "single-spa";
import * as isActive from "./activity-functions";

registerApplication(
  "@dubass/nav-bar",
  () => System.import("@dubass/nav-bar"),
  isActive.nav,
  {domElement: document.getElementById("navbar")}
);

registerApplication(
  "@dubass/page1",
  () => System.import("@dubass/page1"),
  isActive.page1,
  {domElement: document.getElementById("page1")}
);

registerApplication(
  "@dubass/page2",
  () => System.import("@dubass/page2"),
  isActive.page2,
  {domElement: document.getElementById("page2")}
);

registerApplication(
  "@dubass/player",
  () => System.import("@dubass/player"),
  isActive.player,
  {domElement: document.getElementById("player")}
);


start();
