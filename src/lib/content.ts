import type { StoryContent, VideoContent } from "./content-schema";
import video1 from "../../content/videos/teppei-genki-01.json";
import video2 from "../../content/videos/teppei-study-how-long.json";
import video3 from "../../content/videos/akane-directions.json";
import video4 from "../../content/videos/teppei-what-time.json";
import video5 from "../../content/videos/akane-self-intro.json";
import video6 from "../../content/videos/teppei-cold-gym.json";
import video7 from "../../content/videos/teppei-slept-well.json";
import video8 from "../../content/videos/teppei-cinema-tickets.json";
import video9 from "../../content/videos/teppei-cinema-day.json";
import video10 from "../../content/videos/teppei-dont-worry.json";
import video11 from "../../content/videos/teppei-hotel-japanese.json";
import video12 from "../../content/videos/teppei-restaurant-japanese.json";
import video13 from "../../content/videos/teppei-supermarket-japanese.json";
import video14 from "../../content/videos/teppei-no-progress-feeling.json";
import video15 from "../../content/videos/teppei-making-study-time.json";
import video16 from "../../content/videos/teppei-keeping-motivation.json";
import video17 from "../../content/videos/teppei-speaking-confidence.json";
import video18 from "../../content/videos/teppei-vocabulary-memory.json";
import video19 from "../../content/videos/teppei-listening-tests.json";
import video20 from "../../content/videos/teppei-grammar-balance.json";
import video21 from "../../content/videos/teppei-keigo-polite.json";
import video22 from "../../content/videos/teppei-pronunciation-pitch.json";
import video23 from "../../content/videos/teppei-one-method.json";
import video24 from "../../content/videos/teppei-speaking-styles.json";
import video25 from "../../content/videos/akane-cafe-order.json";
import video26 from "../../content/videos/akane-yakiniku-order.json";
import video27 from "../../content/videos/akane-hotel-checkin.json";
import video28 from "../../content/videos/akane-museum-tickets.json";
import video29 from "../../content/videos/akane-sweets-expiry.json";
import video30 from "../../content/videos/akane-interview-weakness.json";
import video31 from "../../content/videos/akane-coffee-order.json";
import video32 from "../../content/videos/akane-changing-jobs.json";
import video33 from "../../content/videos/akane-dictation-n3.json";
import video34 from "../../content/videos/akane-book-words.json";
import video35 from "../../content/videos/akane-phone-reservation.json";
import video36 from "../../content/videos/akane-bakery.json";
import video37 from "../../content/videos/akane-souvenir-shopping.json";
import video38 from "../../content/videos/akane-restaurant-lunch.json";
import video39 from "../../content/videos/akane-burger-order.json";
import video40 from "../../content/videos/akane-grammar-koshita.json";
import video41 from "../../content/videos/akane-grammar-zaru.json";
import video42 from "../../content/videos/akane-shibuya-cafe.json";
import video43 from "../../content/videos/akane-cafe-phrases.json";
import video44 from "../../content/videos/akane-grammar-shoganai.json";
import video45 from "../../content/videos/akane-grammar-tabini.json";
import video46 from "../../content/videos/akane-cafe-phrases-2.json";
import video47 from "../../content/videos/akane-cafe-phrases-3.json";
import video48 from "../../content/videos/akane-cafe-phrases-4.json";
import video49 from "../../content/videos/akane-cafe-dictation.json";
import video50 from "../../content/videos/akane-dictation-n2.json";
import video51 from "../../content/videos/akane-hotel-room.json";
import video52 from "../../content/videos/akane-museum-tour.json";
import video53 from "../../content/videos/akane-yakiniku-grilling.json";
import video54 from "../../content/videos/akane-museum-cafe.json";
import video55 from "../../content/videos/akane-cafe-visit.json";
import video56 from "../../content/videos/akane-cafe-change-order.json";
import video57 from "../../content/videos/akane-coffee-brewing.json";
import video58 from "../../content/videos/akane-sweets-payment.json";
import video59 from "../../content/videos/akane-interview-questions.json";
import video60 from "../../content/videos/akane-job-hopping.json";
import video61 from "../../content/videos/akane-grammar-mettani.json";
import video62 from "../../content/videos/akane-grammar-naradewa.json";
import video63 from "../../content/videos/akane-mistakes-i-adjectives.json";
import video64 from "../../content/videos/akane-mistakes-tagaru.json";
import video65 from "../../content/videos/akane-mistakes-oishisou.json";
import video66 from "../../content/videos/akane-mistakes-time-words.json";
import video67 from "../../content/videos/akane-mistakes-tabenai.json";
import video68 from "../../content/videos/akane-vocab-read-aloud.json";
import video69 from "../../content/videos/akane-vocab-diary.json";
import video70 from "../../content/videos/akane-vocab-name-things.json";
import video71 from "../../content/videos/akane-goals-concrete.json";
import video72 from "../../content/videos/akane-goals-keep-going.json";
import video73 from "../../content/videos/akane-cafe-diary-order.json";
import video74 from "../../content/videos/akane-diary-job-stories.json";
import video75 from "../../content/videos/yuta-morning-alarm.json";
import video76 from "../../content/videos/yuta-morning-breakfast.json";
import video77 from "../../content/videos/yuta-morning-teeth-face.json";
import video78 from "../../content/videos/yuta-morning-get-dressed.json";
import video79 from "../../content/videos/yuta-konbini-night.json";
import video80 from "../../content/videos/yuta-konbini-24h.json";
import video81 from "../../content/videos/yuta-weather-sun-rain.json";
import video82 from "../../content/videos/yuta-weather-snow-thunder.json";
import video83 from "../../content/videos/yuta-clothes-wearing.json";
import video84 from "../../content/videos/yuta-clothes-buying.json";
import video85 from "../../content/videos/yuta-books-reading.json";
import video86 from "../../content/videos/yuta-books-library.json";
import video87 from "../../content/videos/yuta-cup-water.json";
import video88 from "../../content/videos/yuta-cup-washing.json";
import video89 from "../../content/videos/yuta-outside-river.json";
import video90 from "../../content/videos/yuta-outside-actions.json";
import video91 from "../../content/videos/yuta-kore-are.json";
import video92 from "../../content/videos/yuta-kocchi-mukou.json";
import video93 from "../../content/videos/yuta-bicycle-ride.json";
import video94 from "../../content/videos/yuta-bicycle-parts.json";
import video95 from "../../content/videos/yuta-feelings-happy-sad.json";
import video96 from "../../content/videos/yuta-feelings-excited-scared.json";
import video97 from "../../content/videos/akane-failure-challenge.json";
import video98 from "../../content/videos/akane-failure-lesson.json";
import story1 from "../../content/stories/baito-first-morning.json";
import story2 from "../../content/stories/supermarket-first.json";
import story3 from "../../content/stories/at-the-clinic.json";
import story4 from "../../content/stories/train-to-school.json";
import story5 from "../../content/stories/renting-a-room.json";
import story6 from "../../content/stories/yumejuya-night1.json";
import story7 from "../../content/stories/momotaro.json";
import story8 from "../../content/stories/urashima-taro.json";
import story9 from "../../content/stories/kaguya-hime.json";
import story10 from "../../content/stories/issun-boshi.json";
import story11 from "../../content/stories/hanasaka-jiisan.json";
import story12 from "../../content/stories/tsuru-no-ongaeshi.json";
import story13 from "../../content/stories/kintaro.json";
import story14 from "../../content/stories/at-the-bank.json";
import story15 from "../../content/stories/baito-interview.json";
import story16 from "../../content/stories/shita-kiri-suzume.json";
import story17 from "../../content/stories/saru-kani-gassen.json";
import story18 from "../../content/stories/bunbuku-chagama.json";
import story19 from "../../content/stories/yumejuya-night2.json";
import story20 from "../../content/stories/yumejuya-night3.json";
import story21 from "../../content/stories/nezumi-no-yomeiri.json";
import story22 from "../../content/stories/kachi-kachi-yama.json";
import story23 from "../../content/stories/yumejuya-night4.json";
import story24 from "../../content/stories/at-city-hall.json";
import story25 from "../../content/stories/at-the-post-office.json";
import story26 from "../../content/stories/at-the-barber.json";
import story27 from "../../content/stories/yumejuya-night5.json";
import story28 from "../../content/stories/yumejuya-night6.json";
import story29 from "../../content/stories/omusubi-kororin.json";
import story30 from "../../content/stories/kobutori-jiisan.json";
import story31 from "../../content/stories/yumejuya-night7.json";
import story32 from "../../content/stories/yumejuya-night8.json";
import story33 from "../../content/stories/at-the-pharmacy.json";
import story34 from "../../content/stories/taking-out-garbage.json";
import story35 from "../../content/stories/yumejuya-night9.json";
import story36 from "../../content/stories/yumejuya-night10.json";
import story37 from "../../content/stories/at-the-convenience-store.json";
import story38 from "../../content/stories/calling-the-landlord.json";
import story39 from "../../content/stories/warashibe-choja.json";
import story40 from "../../content/stories/yuki-onna.json";
import story41 from "../../content/stories/shopping-for-clothes.json";
import story42 from "../../content/stories/at-the-dentist.json";
import story43 from "../../content/stories/nezumi-no-sumo.json";
import story44 from "../../content/stories/kumo-no-ito.json";
import story45 from "../../content/stories/chumon-no-oi-ryoriten.json";
import story46 from "../../content/stories/sending-a-parcel.json";
import story47 from "../../content/stories/san-nen-netaro.json";
import story48 from "../../content/stories/riding-the-bus.json";
import story49 from "../../content/stories/taking-a-taxi.json";
import story50 from "../../content/stories/getting-a-phone.json";
import story51 from "../../content/stories/rashomon.json";
import story52 from "../../content/stories/visiting-a-shrine.json";
import story53 from "../../content/stories/making-a-reservation.json";
import story54 from "../../content/stories/asking-for-leave.json";
import story55 from "../../content/stories/kasa-jizo.json";
import story57 from "../../content/stories/moving-house.json";
import story58 from "../../content/stories/buying-a-bicycle.json";
import story59 from "../../content/stories/hagoromo.json";
import story60 from "../../content/stories/ame-nimo-makezu.json";
import story61 from "../../content/stories/hanami-picnic.json";
import story62 from "../../content/stories/first-day-at-work.json";
import story63 from "../../content/stories/frog-in-the-well.json";
import story64 from "../../content/stories/at-the-airport.json";
import story65 from "../../content/stories/lost-wallet.json";
import story66 from "../../content/stories/earthquake-safety.json";
import story67 from "../../content/stories/tanabata-story.json";
import story68 from "../../content/stories/at-the-library.json";
import story69 from "../../content/stories/toshishun.json";
import story70 from "../../content/stories/hana-the-nose.json";
import story71 from "../../content/stories/sanmai-no-ofuda.json";
import story72 from "../../content/stories/at-the-laundromat.json";
import story73 from "../../content/stories/cooking-dinner.json";
import story74 from "../../content/stories/sero-hiki-no-goshu.json";
import story75 from "../../content/stories/yamanashi.json";
import story76 from "../../content/stories/at-the-onsen.json";
import story77 from "../../content/stories/kamotori-gonbei.json";
import story78 from "../../content/stories/visiting-a-friend.json";
import story79 from "../../content/stories/donguri-to-yamaneko.json";
import story80 from "../../content/stories/typhoon-day.json";
import story81 from "../../content/stories/first-snow.json";
import story82 from "../../content/stories/benkei-ushiwakamaru.json";
import story83 from "../../content/stories/torokko.json";
import story84 from "../../content/stories/at-the-gym.json";
import story85 from "../../content/stories/obon-holiday.json";
import story86 from "../../content/stories/esugata-nyobo.json";
import story87 from "../../content/stories/mikan.json";
import story88 from "../../content/stories/riding-the-shinkansen.json";
import story89 from "../../content/stories/new-year-in-japan.json";
import story90 from "../../content/stories/ubasute-yama.json";
import story91 from "../../content/stories/gongitsune.json";
import story92 from "../../content/stories/summer-festival.json";
import story93 from "../../content/stories/camping-trip.json";
import story94 from "../../content/stories/zashiki-warashi.json";
import story95 from "../../content/stories/tebukuro-o-kai-ni.json";
import story96 from "../../content/stories/my-number-card.json";
import story97 from "../../content/stories/at-the-hairdresser.json";
import story98 from "../../content/stories/wakagaeri-no-mizu.json";
import story99 from "../../content/stories/dendenmushi-no-kanashimi.json";
import story100 from "../../content/stories/converting-a-license.json";
import story101 from "../../content/stories/trip-to-kyoto.json";
import story102 from "../../content/stories/golden-axe.json";
import story103 from "../../content/stories/imogayu.json";
import story104 from "../../content/stories/health-checkup.json";
import story105 from "../../content/stories/yoro-no-taki.json";
import story106 from "../../content/stories/parents-visiting-japan.json";
import story107 from "../../content/stories/remon-kajii.json";
import story108 from "../../content/stories/using-an-atm.json";
import story109 from "../../content/stories/tengu-no-kakuremino.json";
import story110 from "../../content/stories/trip-to-okinawa.json";
import story111 from "../../content/stories/ojiisan-no-lamp.json";
import story112 from "../../content/stories/buying-a-train-pass.json";
import story113 from "../../content/stories/shuten-doji.json";
import story114 from "../../content/stories/company-drinking-party.json";
import story115 from "../../content/stories/sangetsuki.json";
import story116 from "../../content/stories/three-little-pigs.json";
import story117 from "../../content/stories/japanese-language-class.json";
import story118 from "../../content/stories/trip-to-hokkaido.json";
import story119 from "../../content/stories/yabu-no-naka.json";
import story120 from "../../content/stories/going-to-the-movies.json";
import story121 from "../../content/stories/kitsune-no-yomeiri.json";
import story122 from "../../content/stories/sending-money-home.json";
import story123 from "../../content/stories/i-am-a-cat.json";
import story124 from "../../content/stories/bicycle-rules-in-japan.json";
import story125 from "../../content/stories/daiku-to-oniroku.json";
import story126 from "../../content/stories/christmas-in-japan.json";
import story127 from "../../content/stories/ginga-tetsudo-no-yoru.json";
import story128 from "../../content/stories/finding-a-part-time-job.json";
import story129 from "../../content/stories/tengu-no-uchiwa.json";
import story130 from "../../content/stories/making-a-bento.json";
import story131 from "../../content/stories/takasebune.json";
import story132 from "../../content/stories/opening-a-bank-account.json";
import story133 from "../../content/stories/kikimimi-zukin.json";
import story134 from "../../content/stories/at-the-electronics-store.json";
import story135 from "../../content/stories/botchan.json";
import story136 from "../../content/stories/neighborhood-cleanup.json";
import story137 from "../../content/stories/binbogami.json";
import story138 from "../../content/stories/driving-school.json";
import story139 from "../../content/stories/musashino.json";
import story140 from "../../content/stories/school-sports-day.json";
import story141 from "../../content/stories/miminashi-hoichi.json";
import story142 from "../../content/stories/school-visit-day.json";
import story143 from "../../content/stories/kaze-no-matasaburo.json";
import story144 from "../../content/stories/getting-glasses.json";
import story145 from "../../content/stories/setsubun.json";
import story146 from "../../content/stories/buying-a-used-car.json";
import story147 from "../../content/stories/kappa.json";
import story148 from "../../content/stories/using-courier-delivery.json";
import story149 from "../../content/stories/usagi-to-kame.json";
import story150 from "../../content/stories/apartment-living-rules.json";
import story151 from "../../content/stories/takekurabe.json";
import story152 from "../../content/stories/renting-a-car.json";
import story153 from "../../content/stories/akazukin.json";
import story154 from "../../content/stories/at-the-vet.json";
import story156 from "../../content/stories/at-the-bookstore.json";
import story157 from "../../content/stories/match-girl.json";
import story158 from "../../content/stories/school-lunch.json";
import story159 from "../../content/stories/maihime.json";
import story160 from "../../content/stories/birthday-party.json";
import story161 from "../../content/stories/cinderella.json";
import story162 from "../../content/stories/kotatsu-winter.json";
import story163 from "../../content/stories/kokoro.json";
import story164 from "../../content/stories/smartphone-payment.json";
import story165 from "../../content/stories/ningyo-hime.json";
import story166 from "../../content/stories/farmers-market.json";
import story168 from "../../content/stories/zoo-with-kids.json";
import story169 from "../../content/stories/bremen-musicians.json";
import story170 from "../../content/stories/entrance-ceremony.json";
import story171 from "../../content/stories/sanshiro.json";
import story172 from "../../content/stories/at-the-gas-station.json";
import story173 from "../../content/stories/thumbelina.json";
import story174 from "../../content/stories/kids-swimming-school.json";
import story175 from "../../content/stories/sansho-dayu.json";
import story176 from "../../content/stories/at-the-flower-shop.json";
import story177 from "../../content/stories/hansel-and-gretel.json";
import story178 from "../../content/stories/piano-lessons.json";
import story179 from "../../content/stories/goju-no-to.json";
import story180 from "../../content/stories/hundred-yen-shop.json";
import story181 from "../../content/stories/puss-in-boots.json";
import story182 from "../../content/stories/balcony-garden.json";
import story183 from "../../content/stories/shiki-haiku.json";
import story184 from "../../content/stories/bicycle-practice.json";
import story185 from "../../content/stories/jack-and-the-beanstalk.json";
import story186 from "../../content/stories/radio-taiso.json";
import story187 from "../../content/stories/yosano-akiko.json";
import story188 from "../../content/stories/preparing-nengajo.json";
import story189 from "../../content/stories/snow-white.json";
import story190 from "../../content/stories/first-allowance.json";
import story191 from "../../content/stories/kitahara-hakushu.json";
import story192 from "../../content/stories/buying-a-birthday-cake.json";
import story193 from "../../content/stories/alice-in-wonderland.json";
import story194 from "../../content/stories/first-lost-tooth.json";
import story195 from "../../content/stories/hagiwara-sakutaro.json";
import story196 from "../../content/stories/lost-and-found.json";
import story197 from "../../content/stories/the-frog-prince.json";
import story198 from "../../content/stories/attending-a-wedding.json";
import story199 from "../../content/stories/ikkyu-san.json";
import story200 from "../../content/stories/at-the-aquarium.json";
import story201 from "../../content/stories/shimazaki-toson.json";
import story202 from "../../content/stories/attending-a-funeral.json";
import story203 from "../../content/stories/the-ugly-duckling.json";
import story204 from "../../content/stories/neighborhood-association.json";
import story205 from "../../content/stories/izumi-kyoka.json";
import story206 from "../../content/stories/school-field-trip.json";
import story207 from "../../content/stories/pinocchio.json";
import story208 from "../../content/stories/getting-a-credit-card.json";
import story209 from "../../content/stories/arishima-takeo.json";
import story210 from "../../content/stories/at-the-park.json";
import story211 from "../../content/stories/the-boy-who-cried-wolf.json";
import story212 from "../../content/stories/disaster-kit.json";
import story213 from "../../content/stories/hakai.json";
import story214 from "../../content/stories/the-rainy-day.json";
import story215 from "../../content/stories/the-ant-and-the-grasshopper.json";
import story216 from "../../content/stories/getting-internet.json";
import story217 from "../../content/stories/kusamakura.json";
import story218 from "../../content/stories/trip-to-the-beach.json";
import story219 from "../../content/stories/the-emperors-new-clothes.json";
import story220 from "../../content/stories/childrens-vaccinations.json";
import story222 from "../../content/stories/playing-in-the-snow.json";
import story223 from "../../content/stories/the-lion-and-the-mouse.json";
import story224 from "../../content/stories/bicycle-repair.json";
import story226 from "../../content/stories/autumn-leaves-walk.json";
import story227 from "../../content/stories/the-elves-and-the-shoemaker.json";
import story228 from "../../content/stories/night-shift-life.json";
import story229 from "../../content/stories/porano-no-hiroba.json";
import story230 from "../../content/stories/the-neighborhood-cat.json";
import story231 from "../../content/stories/the-golden-goose.json";
import story232 from "../../content/stories/company-trip.json";
import story233 from "../../content/stories/sorekara.json";
import story234 from "../../content/stories/the-thousand-cranes.json";
import story235 from "../../content/stories/the-town-mouse-and-the-country-mouse.json";
import story236 from "../../content/stories/company-dormitory.json";
import story237 from "../../content/stories/mon-the-gate.json";
import story238 from "../../content/stories/the-typhoon-day.json";
import story239 from "../../content/stories/the-north-wind-and-the-sun.json";
import story240 from "../../content/stories/the-fire-drill.json";
import story241 from "../../content/stories/mujina.json";
import story242 from "../../content/stories/the-letter-from-far-away.json";
import story243 from "../../content/stories/the-goose-with-the-golden-eggs.json";
import story244 from "../../content/stories/the-morning-meeting.json";
import story245 from "../../content/stories/gan-the-wild-geese.json";
import story246 from "../../content/stories/the-fisherman-and-the-magic-fish.json";
import story247 from "../../content/stories/the-wolf-and-the-crane.json";
import story248 from "../../content/stories/the-business-trip.json";
import story249 from "../../content/stories/jusan-ya.json";
import story250 from "../../content/stories/the-star-money.json";
import story251 from "../../content/stories/the-crow-and-the-pitcher.json";
import story252 from "../../content/stories/the-fox-and-the-grapes.json";
import story255 from "../../content/stories/the-dog-and-its-reflection.json";
import story256 from "../../content/stories/the-first-payday.json";
import story257 from "../../content/stories/the-lost-wallet.json";
import story259 from "../../content/stories/the-milkmaid.json";
import story261 from "../../content/stories/the-first-bonus.json";
import story262 from "../../content/stories/the-pension-notice.json";
import story263 from "../../content/stories/the-year-end-adjustment.json";
import story264 from "../../content/stories/kasako-jizo.json";
import story266 from "../../content/stories/the-moving-registration.json";
import story267 from "../../content/stories/the-japanese-class.json";
import story268 from "../../content/stories/yodaka-no-hoshi.json";
import story269 from "../../content/stories/tanabata.json";
import story270 from "../../content/stories/the-two-goats.json";
import story271 from "../../content/stories/the-bear-and-the-bees.json";
import story272 from "../../content/stories/the-license-renewal.json";
import story273 from "../../content/stories/the-happy-prince.json";
import story274 from "../../content/stories/the-fox-and-the-lion.json";
import story275 from "../../content/stories/the-selfish-giant.json";
import story276 from "../../content/stories/the-nightingale-and-the-rose.json";
import story277 from "../../content/stories/the-commuter-pass.json";
import story278 from "../../content/stories/the-health-insurance-card.json";
import story279 from "../../content/stories/the-bicycle-registration.json";
import story280 from "../../content/stories/the-golden-axe.json";
import story281 from "../../content/stories/the-point-card.json";
import story282 from "../../content/stories/the-garbage-sorting.json";
import story283 from "../../content/stories/the-ant-and-the-dove.json";
import story284 from "../../content/stories/the-residence-tax.json";
import story285 from "../../content/stories/the-tale-of-genji.json";
import story286 from "../../content/stories/the-fox-and-the-stork.json";
import story287 from "../../content/stories/the-wolf-in-sheeps-clothing.json";
import story288 from "../../content/stories/the-company-cafeteria.json";
import story289 from "../../content/stories/the-town-mouse.json";
import story290 from "../../content/stories/the-atm.json";
import story291 from "../../content/stories/the-dentist.json";
import story293 from "../../content/stories/the-shepherd-boy.json";
import story294 from "../../content/stories/the-glasses-shop.json";
import story295 from "../../content/stories/mai-chan-ep01-hello.json";
import story296 from "../../content/stories/mai-chan-ep02-homework.json";
import story297 from "../../content/stories/mai-chan-ep03-shared-umbrella.json";
import story298 from "../../content/stories/mai-chan-ep04-onigiri.json";
import story299 from "../../content/stories/mai-chan-ep05-sports-day.json";
import story300 from "../../content/stories/mai-chan-ep06-loose-tooth.json";
import story301 from "../../content/stories/the-library-card.json";
import story302 from "../../content/stories/mai-chan-ep07-birthday.json";
import story303 from "../../content/stories/mai-chan-ep08-sick-mom.json";
import story304 from "../../content/stories/the-shinkansen-trip.json";
import story305 from "../../content/stories/the-little-red-hen.json";
import story306 from "../../content/stories/mai-chan-ep09-autumn-leaves.json";
import story307 from "../../content/stories/mai-chan-ep10-new-friend.json";
import story308 from "../../content/stories/the-driving-school.json";
import story309 from "../../content/stories/the-three-little-pigs.json";
import story310 from "../../content/stories/mai-chan-ep11-tomatoes.json";
import story311 from "../../content/stories/mai-chan-ep12-calling-grandma.json";
import story312 from "../../content/stories/rapunzel.json";
import story313 from "../../content/stories/the-bicycle-puncture.json";
import story314 from "../../content/stories/mai-chan-ep13-rainy-day.json";
import story315 from "../../content/stories/mai-chan-ep14-cooking-curry.json";
import story316 from "../../content/stories/sleeping-beauty.json";
import story317 from "../../content/stories/the-post-office.json";
import story318 from "../../content/stories/mai-chan-ep15-lost-cat.json";
import story319 from "../../content/stories/mai-chan-ep16-dad-cooks-pho.json";
import story320 from "../../content/stories/the-train-etiquette.json";
import story321 from "../../content/stories/rumpelstiltskin.json";
import story322 from "../../content/stories/mai-chan-ep17-snow-day.json";
import story323 from "../../content/stories/mai-chan-ep18-new-year-card.json";
import story324 from "../../content/stories/the-onsen-trip.json";
import story325 from "../../content/stories/the-wizard-of-oz.json";
import story326 from "../../content/stories/mai-chan-ep19-christmas.json";
import story327 from "../../content/stories/mai-chan-ep20-year-end-clean.json";
import story328 from "../../content/stories/the-year-end-party.json";
import story329 from "../../content/stories/peter-pan.json";
import story330 from "../../content/stories/mai-chan-ep21-zoo.json";
import story331 from "../../content/stories/mai-chan-ep22-baking-cookies.json";
import story332 from "../../content/stories/the-moving-day.json";
import story333 from "../../content/stories/don-quixote.json";
import story334 from "../../content/stories/mai-chan-ep23-tulip-bulbs.json";
import story335 from "../../content/stories/mai-chan-ep24-mochi-pounding.json";
import story336 from "../../content/stories/the-lost-umbrella.json";
import story337 from "../../content/stories/heidi.json";
import story338 from "../../content/stories/mai-chan-ep25-fire-drill.json";
import story339 from "../../content/stories/mai-chan-ep26-picture-diary.json";
import story340 from "../../content/stories/the-shoe-repair.json";
import story341 from "../../content/stories/robinson-crusoe.json";
import story342 from "../../content/stories/mai-chan-ep27-helping-neighbor.json";
import story343 from "../../content/stories/mai-chan-ep28-cooking-rice.json";
import story344 from "../../content/stories/the-locked-out.json";
import story345 from "../../content/stories/anne-of-green-gables.json";
import story346 from "../../content/stories/mai-chan-ep29-ice-skating.json";
import story347 from "../../content/stories/mai-chan-ep30-letter-to-santa.json";
import story348 from "../../content/stories/the-laundromat.json";
import story349 from "../../content/stories/the-little-mermaid.json";
import story350 from "../../content/stories/mai-chan-ep31-new-year-shrine.json";
import story351 from "../../content/stories/mai-chan-ep32-setsubun.json";
import story352 from "../../content/stories/the-wrong-train.json";
import story353 from "../../content/stories/a-christmas-carol.json";
import story354 from "../../content/stories/mai-chan-ep33-valentine.json";
import story355 from "../../content/stories/mai-chan-ep34-hinamatsuri.json";
import story356 from "../../content/stories/the-recycle-shop.json";
import story357 from "../../content/stories/the-snow-queen.json";
import story358 from "../../content/stories/mai-chan-ep35-white-day.json";
import story359 from "../../content/stories/mai-chan-ep36-hanami-picnic.json";
import story360 from "../../content/stories/the-blood-donation.json";
import story361 from "../../content/stories/around-the-world-in-80-days.json";
import story362 from "../../content/stories/mai-chan-ep37-graduation-day.json";
import story363 from "../../content/stories/mai-chan-ep38-new-school-year.json";
import story364 from "../../content/stories/the-sim-card.json";
import story365 from "../../content/stories/treasure-island.json";
import story366 from "../../content/stories/mai-chan-ep39-childrens-day.json";
import story367 from "../../content/stories/mai-chan-ep40-mothers-day.json";
import story368 from "../../content/stories/the-water-leak.json";
import story369 from "../../content/stories/tom-sawyer.json";
import story370 from "../../content/stories/mai-chan-ep41-fathers-day.json";
import story371 from "../../content/stories/mai-chan-ep42-rainy-season.json";
import story372 from "../../content/stories/the-noisy-neighbor.json";
import story373 from "../../content/stories/the-jungle-book.json";
import story374 from "../../content/stories/mai-chan-ep43-tanabata.json";
import story375 from "../../content/stories/mai-chan-ep44-summer-festival.json";
import story376 from "../../content/stories/the-aircon-cleaning.json";
import story377 from "../../content/stories/the-prince-and-the-pauper.json";
import story378 from "../../content/stories/mai-chan-ep45-pool-day.json";
import story379 from "../../content/stories/mai-chan-ep46-obon.json";
import story380 from "../../content/stories/the-secret-garden.json";
import story381 from "../../content/stories/mai-chan-ep47-summer-homework.json";
import story382 from "../../content/stories/mai-chan-ep48-sea-trip.json";
import story383 from "../../content/stories/a-little-princess.json";
import story384 from "../../content/stories/mai-chan-ep49-moon-viewing.json";
import story385 from "../../content/stories/mai-chan-ep50-future-dream.json";
import story386 from "../../content/stories/the-emergency-bag.json";
import story387 from "../../content/stories/oliver-twist.json";
import story388 from "../../content/stories/mai-chan-ep51-sweet-potato.json";
import story389 from "../../content/stories/mai-chan-ep52-culture-festival.json";
import story390 from "../../content/stories/the-package-redelivery.json";
import story391 from "../../content/stories/jane-eyre.json";
import story392 from "../../content/stories/mai-chan-ep53-planetarium.json";
import story393 from "../../content/stories/mai-chan-ep54-grandma-visits.json";
import story394 from "../../content/stories/the-hanko-seal.json";
import story395 from "../../content/stories/wuthering-heights.json";
import story396 from "../../content/stories/mai-chan-ep55-school-lunch.json";
import story397 from "../../content/stories/mai-chan-ep56-class-pet.json";
import story398 from "../../content/stories/the-pharmacy.json";
import story399 from "../../content/stories/pride-and-prejudice.json";
import story400 from "../../content/stories/mai-chan-ep57-piano-recital.json";
import story401 from "../../content/stories/mai-chan-ep58-time-capsule.json";
import story402 from "../../content/stories/the-100-yen-shop.json";
import story403 from "../../content/stories/the-count-of-monte-cristo.json";
import story404 from "../../content/stories/mai-chan-ep59-endurance-run.json";
import story405 from "../../content/stories/mai-chan-ep60-randoseru.json";
import story406 from "../../content/stories/the-tax-return.json";
import story407 from "../../content/stories/the-three-musketeers.json";
import story408 from "../../content/stories/mai-chan-ep61-kite-flying.json";
import story409 from "../../content/stories/mai-chan-ep62-yuki-birthday.json";
import story410 from "../../content/stories/the-gym-membership.json";
import story411 from "../../content/stories/les-miserables.json";
import story412 from "../../content/stories/mai-chan-ep63-baking-bread.json";
import story413 from "../../content/stories/mai-chan-ep64-lost-in-supermarket.json";
import story414 from "../../content/stories/the-english-class.json";
import story415 from "../../content/stories/great-expectations.json";
import story416 from "../../content/stories/mai-chan-ep65-cooking-dinner.json";
import story417 from "../../content/stories/mai-chan-ep66-factory-tour.json";
import story418 from "../../content/stories/the-part-time-job.json";
import story419 from "../../content/stories/the-picture-of-dorian-gray.json";
import story420 from "../../content/stories/the-overtime-night.json";
import story421 from "../../content/stories/the-apartment-contract.json";
import story422 from "../../content/stories/the-hospital-stay.json";
import story423 from "../../content/stories/the-letter-never-sent.json";
import story424 from "../../content/stories/the-job-change.json";
import story425 from "../../content/stories/the-earthquake-night.json";
import story426 from "../../content/stories/the-old-bookshop.json";
import story427 from "../../content/stories/the-parents-care.json";
import story428 from "../../content/stories/the-narrow-road.json";
import story429 from "../../content/stories/the-aging-society.json";
import story430 from "../../content/stories/the-meiji-restoration.json";
import story431 from "../../content/stories/the-interpreter.json";
import story432 from "../../content/stories/the-driving-license.json";
import story433 from "../../content/stories/the-school-sports-day.json";
import story434 from "../../content/stories/the-night-shift.json";
import story435 from "../../content/stories/the-reunion.json";
import story436 from "../../content/stories/the-promotion.json";
import story437 from "../../content/stories/the-wedding-speech.json";
import story438 from "../../content/stories/the-small-business.json";
import story439 from "../../content/stories/the-mountain-temple.json";
import story440 from "../../content/stories/the-last-craftsman.json";
import story441 from "../../content/stories/the-two-homelands.json";
import story442 from "../../content/stories/the-philosophy-of-time.json";
import story443 from "../../content/stories/the-lighthouse-keeper.json";
import story444 from "../../content/stories/the-bicycle-rules.json";
import story445 from "../../content/stories/the-parents-visit.json";
import story446 from "../../content/stories/the-first-snow.json";
import story447 from "../../content/stories/the-neighborhood-association.json";
import story448 from "../../content/stories/the-result-postcard.json";
import story449 from "../../content/stories/the-mentor.json";
import story450 from "../../content/stories/the-marathon.json";
import story451 from "../../content/stories/the-night-train.json";
import story452 from "../../content/stories/the-old-photograph.json";
import story453 from "../../content/stories/the-language-of-silence.json";
import story454 from "../../content/stories/when-an-era-changes.json";
import story455 from "../../content/stories/the-japanese-garden.json";
import s_furusatoVnTamcam1 from "../../content/stories/furusato-vn-tamcam-1.json";
import s_furusatoVnTamcam2 from "../../content/stories/furusato-vn-tamcam-2.json";
import s_furusatoVnTamcam3 from "../../content/stories/furusato-vn-tamcam-3.json";
import s_furusatoVnSodua1 from "../../content/stories/furusato-vn-sodua-1.json";
import s_furusatoVnGiong1 from "../../content/stories/furusato-vn-giong-1.json";
import s_furusatoVnSontinh1 from "../../content/stories/furusato-vn-sontinh-1.json";
import s_osakaHataraku01 from "../../content/stories/osaka-hataraku-01.json";
import s_osakaHataraku02 from "../../content/stories/osaka-hataraku-02.json";
import s_osakaHataraku03 from "../../content/stories/osaka-hataraku-03.json";
import s_osakaHataraku04 from "../../content/stories/osaka-hataraku-04.json";
import s_osakaHataraku05 from "../../content/stories/osaka-hataraku-05.json";
import s_furusatoVnCaytre1 from "../../content/stories/furusato-vn-caytre-1.json";
import s_furusatoVnMaiantiem1 from "../../content/stories/furusato-vn-maiantiem-1.json";
import s_furusatoVnThachsanh1 from "../../content/stories/furusato-vn-thachsanh-1.json";
import s_furusatoVnThachsanh2 from "../../content/stories/furusato-vn-thachsanh-2.json";
import s_furusatoVnThachsanh3 from "../../content/stories/furusato-vn-thachsanh-3.json";
import s_furusatoVnKhe1 from "../../content/stories/furusato-vn-khe-1.json";
import s_furusatoVnHoguom1 from "../../content/stories/furusato-vn-hoguom-1.json";
import s_furusatoVnRongtien1 from "../../content/stories/furusato-vn-rongtien-1.json";
import s_furusatoVnChudongtu1 from "../../content/stories/furusato-vn-chudongtu-1.json";
import s_furusatoVnTuthuc1 from "../../content/stories/furusato-vn-tuthuc-1.json";
import s_furusatoVnTraucau1 from "../../content/stories/furusato-vn-traucau-1.json";
import s_furusatoKrHeungbu1 from "../../content/stories/furusato-kr-heungbu-1.json";
import s_furusatoKrSimcheong1 from "../../content/stories/furusato-kr-simcheong-1.json";
import s_furusatoKrOnui1 from "../../content/stories/furusato-kr-onui-1.json";
import s_furusatoKrKongjwi1 from "../../content/stories/furusato-kr-kongjwi-1.json";
import s_furusatoCnNiulang1 from "../../content/stories/furusato-cn-niulang-1.json";
import s_furusatoCnBaishe1 from "../../content/stories/furusato-cn-baishe-1.json";
import s_furusatoCnChange1 from "../../content/stories/furusato-cn-change-1.json";
import s_furusatoCnSaiyuki1 from "../../content/stories/furusato-cn-saiyuki-1.json";
import s_furusatoCnSaiyuki2 from "../../content/stories/furusato-cn-saiyuki-2.json";
import s_furusatoCnSaiyuki3 from "../../content/stories/furusato-cn-saiyuki-3.json";
import s_furusatoPhMalakas1 from "../../content/stories/furusato-ph-malakas-1.json";
import s_furusatoPhPinya1 from "../../content/stories/furusato-ph-pinya-1.json";
import s_furusatoPhPagong1 from "../../content/stories/furusato-ph-pagong-1.json";
import s_furusatoPhJuan1 from "../../content/stories/furusato-ph-juan-1.json";
import s_furusatoIdMalin1 from "../../content/stories/furusato-id-malin-1.json";
import s_furusatoIdTimun1 from "../../content/stories/furusato-id-timun-1.json";
import s_furusatoIdBawang1 from "../../content/stories/furusato-id-bawang-1.json";
import s_furusatoIdSangkuriang1 from "../../content/stories/furusato-id-sangkuriang-1.json";
import s_furusatoIdKancil1 from "../../content/stories/furusato-id-kancil-1.json";
import s_furusatoThSangthong1 from "../../content/stories/furusato-th-sangthong-1.json";
import s_furusatoThAphai1 from "../../content/stories/furusato-th-aphai-1.json";
import s_furusatoNpManjushri1 from "../../content/stories/furusato-np-manjushri-1.json";

export const VIDEOS: VideoContent[] = [
  video1 as unknown as VideoContent,
  video2 as unknown as VideoContent,
  video3 as unknown as VideoContent,
  video4 as unknown as VideoContent,
  video5 as unknown as VideoContent,
  video6 as unknown as VideoContent,
  video7 as unknown as VideoContent,
  video8 as unknown as VideoContent,
  video9 as unknown as VideoContent,
  video10 as unknown as VideoContent,
  video11 as unknown as VideoContent,
  video12 as unknown as VideoContent,
  video13 as unknown as VideoContent,
  video14 as unknown as VideoContent,
  video15 as unknown as VideoContent,
  video16 as unknown as VideoContent,
  video17 as unknown as VideoContent,
  video18 as unknown as VideoContent,
  video19 as unknown as VideoContent,
  video20 as unknown as VideoContent,
  video21 as unknown as VideoContent,
  video22 as unknown as VideoContent,
  video23 as unknown as VideoContent,
  video24 as unknown as VideoContent,
  video25 as unknown as VideoContent,
  video26 as unknown as VideoContent,
  video27 as unknown as VideoContent,
  video28 as unknown as VideoContent,
  video29 as unknown as VideoContent,
  video30 as unknown as VideoContent,
  video31 as unknown as VideoContent,
  video32 as unknown as VideoContent,
  video33 as unknown as VideoContent,
  video34 as unknown as VideoContent,
  video35 as unknown as VideoContent,
  video36 as unknown as VideoContent,
  video37 as unknown as VideoContent,
  video38 as unknown as VideoContent,
  video39 as unknown as VideoContent,
  video40 as unknown as VideoContent,
  video41 as unknown as VideoContent,
  video42 as unknown as VideoContent,
  video43 as unknown as VideoContent,
  video44 as unknown as VideoContent,
  video45 as unknown as VideoContent,
  video46 as unknown as VideoContent,
  video47 as unknown as VideoContent,
  video48 as unknown as VideoContent,
  video49 as unknown as VideoContent,
  video50 as unknown as VideoContent,
  video51 as unknown as VideoContent,
  video52 as unknown as VideoContent,
  video53 as unknown as VideoContent,
  video54 as unknown as VideoContent,
  video55 as unknown as VideoContent,
  video56 as unknown as VideoContent,
  video57 as unknown as VideoContent,
  video58 as unknown as VideoContent,
  video59 as unknown as VideoContent,
  video60 as unknown as VideoContent,
  video61 as unknown as VideoContent,
  video62 as unknown as VideoContent,
  video63 as unknown as VideoContent,
  video64 as unknown as VideoContent,
  video65 as unknown as VideoContent,
  video66 as unknown as VideoContent,
  video67 as unknown as VideoContent,
  video68 as unknown as VideoContent,
  video69 as unknown as VideoContent,
  video70 as unknown as VideoContent,
  video71 as unknown as VideoContent,
  video72 as unknown as VideoContent,
  video73 as unknown as VideoContent,
  video74 as unknown as VideoContent,
  video75 as unknown as VideoContent,
  video76 as unknown as VideoContent,
  video77 as unknown as VideoContent,
  video78 as unknown as VideoContent,
  video79 as unknown as VideoContent,
  video80 as unknown as VideoContent,
  video81 as unknown as VideoContent,
  video82 as unknown as VideoContent,
  video83 as unknown as VideoContent,
  video84 as unknown as VideoContent,
  video85 as unknown as VideoContent,
  video86 as unknown as VideoContent,
  video87 as unknown as VideoContent,
  video88 as unknown as VideoContent,
  video89 as unknown as VideoContent,
  video90 as unknown as VideoContent,
  video91 as unknown as VideoContent,
  video92 as unknown as VideoContent,
  video93 as unknown as VideoContent,
  video94 as unknown as VideoContent,
  video95 as unknown as VideoContent,
  video96 as unknown as VideoContent,
  video97 as unknown as VideoContent,
  video98 as unknown as VideoContent,
];
export const STORIES: StoryContent[] = [
  story1 as unknown as StoryContent,
  story2 as unknown as StoryContent,
  story3 as unknown as StoryContent,
  story4 as unknown as StoryContent,
  story5 as unknown as StoryContent,
  story6 as unknown as StoryContent,
  story7 as unknown as StoryContent,
  story8 as unknown as StoryContent,
  story9 as unknown as StoryContent,
  story10 as unknown as StoryContent,
  story11 as unknown as StoryContent,
  story12 as unknown as StoryContent,
  story13 as unknown as StoryContent,
  story14 as unknown as StoryContent,
  story15 as unknown as StoryContent,
  story16 as unknown as StoryContent,
  story17 as unknown as StoryContent,
  story18 as unknown as StoryContent,
  story19 as unknown as StoryContent,
  story20 as unknown as StoryContent,
  story21 as unknown as StoryContent,
  story22 as unknown as StoryContent,
  story23 as unknown as StoryContent,
  story24 as unknown as StoryContent,
  story25 as unknown as StoryContent,
  story26 as unknown as StoryContent,
  story27 as unknown as StoryContent,
  story28 as unknown as StoryContent,
  story29 as unknown as StoryContent,
  story30 as unknown as StoryContent,
  story31 as unknown as StoryContent,
  story32 as unknown as StoryContent,
  story33 as unknown as StoryContent,
  story34 as unknown as StoryContent,
  story35 as unknown as StoryContent,
  story36 as unknown as StoryContent,
  story37 as unknown as StoryContent,
  story38 as unknown as StoryContent,
  story39 as unknown as StoryContent,
  story40 as unknown as StoryContent,
  story41 as unknown as StoryContent,
  story42 as unknown as StoryContent,
  story43 as unknown as StoryContent,
  story44 as unknown as StoryContent,
  story45 as unknown as StoryContent,
  story46 as unknown as StoryContent,
  story47 as unknown as StoryContent,
  story48 as unknown as StoryContent,
  story49 as unknown as StoryContent,
  story50 as unknown as StoryContent,
  story51 as unknown as StoryContent,
  story52 as unknown as StoryContent,
  story53 as unknown as StoryContent,
  story54 as unknown as StoryContent,
  story55 as unknown as StoryContent,
  story57 as unknown as StoryContent,
  story58 as unknown as StoryContent,
  story59 as unknown as StoryContent,
  story60 as unknown as StoryContent,
  story61 as unknown as StoryContent,
  story62 as unknown as StoryContent,
  story63 as unknown as StoryContent,
  story64 as unknown as StoryContent,
  story65 as unknown as StoryContent,
  story66 as unknown as StoryContent,
  story67 as unknown as StoryContent,
  story68 as unknown as StoryContent,
  story69 as unknown as StoryContent,
  story70 as unknown as StoryContent,
  story71 as unknown as StoryContent,
  story72 as unknown as StoryContent,
  story73 as unknown as StoryContent,
  story74 as unknown as StoryContent,
  story75 as unknown as StoryContent,
  story76 as unknown as StoryContent,
  story77 as unknown as StoryContent,
  story78 as unknown as StoryContent,
  story79 as unknown as StoryContent,
  story80 as unknown as StoryContent,
  story81 as unknown as StoryContent,
  story82 as unknown as StoryContent,
  story83 as unknown as StoryContent,
  story84 as unknown as StoryContent,
  story85 as unknown as StoryContent,
  story86 as unknown as StoryContent,
  story87 as unknown as StoryContent,
  story88 as unknown as StoryContent,
  story89 as unknown as StoryContent,
  story90 as unknown as StoryContent,
  story91 as unknown as StoryContent,
  story92 as unknown as StoryContent,
  story93 as unknown as StoryContent,
  story94 as unknown as StoryContent,
  story95 as unknown as StoryContent,
  story96 as unknown as StoryContent,
  story97 as unknown as StoryContent,
  story98 as unknown as StoryContent,
  story99 as unknown as StoryContent,
  story100 as unknown as StoryContent,
  story101 as unknown as StoryContent,
  story102 as unknown as StoryContent,
  story103 as unknown as StoryContent,
  story104 as unknown as StoryContent,
  story105 as unknown as StoryContent,
  story106 as unknown as StoryContent,
  story107 as unknown as StoryContent,
  story108 as unknown as StoryContent,
  story109 as unknown as StoryContent,
  story110 as unknown as StoryContent,
  story111 as unknown as StoryContent,
  story112 as unknown as StoryContent,
  story113 as unknown as StoryContent,
  story114 as unknown as StoryContent,
  story115 as unknown as StoryContent,
  story116 as unknown as StoryContent,
  story117 as unknown as StoryContent,
  story118 as unknown as StoryContent,
  story119 as unknown as StoryContent,
  story120 as unknown as StoryContent,
  story121 as unknown as StoryContent,
  story122 as unknown as StoryContent,
  story123 as unknown as StoryContent,
  story124 as unknown as StoryContent,
  story125 as unknown as StoryContent,
  story126 as unknown as StoryContent,
  story127 as unknown as StoryContent,
  story128 as unknown as StoryContent,
  story129 as unknown as StoryContent,
  story130 as unknown as StoryContent,
  story131 as unknown as StoryContent,
  story132 as unknown as StoryContent,
  story133 as unknown as StoryContent,
  story134 as unknown as StoryContent,
  story135 as unknown as StoryContent,
  story136 as unknown as StoryContent,
  story137 as unknown as StoryContent,
  story138 as unknown as StoryContent,
  story139 as unknown as StoryContent,
  story140 as unknown as StoryContent,
  story141 as unknown as StoryContent,
  story142 as unknown as StoryContent,
  story143 as unknown as StoryContent,
  story144 as unknown as StoryContent,
  story145 as unknown as StoryContent,
  story146 as unknown as StoryContent,
  story147 as unknown as StoryContent,
  story148 as unknown as StoryContent,
  story149 as unknown as StoryContent,
  story150 as unknown as StoryContent,
  story151 as unknown as StoryContent,
  story152 as unknown as StoryContent,
  story153 as unknown as StoryContent,
  story154 as unknown as StoryContent,
  story156 as unknown as StoryContent,
  story157 as unknown as StoryContent,
  story158 as unknown as StoryContent,
  story159 as unknown as StoryContent,
  story160 as unknown as StoryContent,
  story161 as unknown as StoryContent,
  story162 as unknown as StoryContent,
  story163 as unknown as StoryContent,
  story164 as unknown as StoryContent,
  story165 as unknown as StoryContent,
  story166 as unknown as StoryContent,
  story168 as unknown as StoryContent,
  story169 as unknown as StoryContent,
  story170 as unknown as StoryContent,
  story171 as unknown as StoryContent,
  story172 as unknown as StoryContent,
  story173 as unknown as StoryContent,
  story174 as unknown as StoryContent,
  story175 as unknown as StoryContent,
  story176 as unknown as StoryContent,
  story177 as unknown as StoryContent,
  story178 as unknown as StoryContent,
  story179 as unknown as StoryContent,
  story180 as unknown as StoryContent,
  story181 as unknown as StoryContent,
  story182 as unknown as StoryContent,
  story183 as unknown as StoryContent,
  story184 as unknown as StoryContent,
  story185 as unknown as StoryContent,
  story186 as unknown as StoryContent,
  story187 as unknown as StoryContent,
  story188 as unknown as StoryContent,
  story189 as unknown as StoryContent,
  story190 as unknown as StoryContent,
  story191 as unknown as StoryContent,
  story192 as unknown as StoryContent,
  story193 as unknown as StoryContent,
  story194 as unknown as StoryContent,
  story195 as unknown as StoryContent,
  story196 as unknown as StoryContent,
  story197 as unknown as StoryContent,
  story198 as unknown as StoryContent,
  story199 as unknown as StoryContent,
  story200 as unknown as StoryContent,
  story201 as unknown as StoryContent,
  story202 as unknown as StoryContent,
  story203 as unknown as StoryContent,
  story204 as unknown as StoryContent,
  story205 as unknown as StoryContent,
  story206 as unknown as StoryContent,
  story207 as unknown as StoryContent,
  story208 as unknown as StoryContent,
  story209 as unknown as StoryContent,
  story210 as unknown as StoryContent,
  story211 as unknown as StoryContent,
  story212 as unknown as StoryContent,
  story213 as unknown as StoryContent,
  story214 as unknown as StoryContent,
  story215 as unknown as StoryContent,
  story216 as unknown as StoryContent,
  story217 as unknown as StoryContent,
  story218 as unknown as StoryContent,
  story219 as unknown as StoryContent,
  story220 as unknown as StoryContent,
  story222 as unknown as StoryContent,
  story223 as unknown as StoryContent,
  story224 as unknown as StoryContent,
  story226 as unknown as StoryContent,
  story227 as unknown as StoryContent,
  story228 as unknown as StoryContent,
  story229 as unknown as StoryContent,
  story230 as unknown as StoryContent,
  story231 as unknown as StoryContent,
  story232 as unknown as StoryContent,
  story233 as unknown as StoryContent,
  story234 as unknown as StoryContent,
  story235 as unknown as StoryContent,
  story236 as unknown as StoryContent,
  story237 as unknown as StoryContent,
  story238 as unknown as StoryContent,
  story239 as unknown as StoryContent,
  story240 as unknown as StoryContent,
  story241 as unknown as StoryContent,
  story242 as unknown as StoryContent,
  story243 as unknown as StoryContent,
  story244 as unknown as StoryContent,
  story245 as unknown as StoryContent,
  story246 as unknown as StoryContent,
  story247 as unknown as StoryContent,
  story248 as unknown as StoryContent,
  story249 as unknown as StoryContent,
  story250 as unknown as StoryContent,
  story251 as unknown as StoryContent,
  story252 as unknown as StoryContent,
  story255 as unknown as StoryContent,
  story256 as unknown as StoryContent,
  story257 as unknown as StoryContent,
  story259 as unknown as StoryContent,
  story261 as unknown as StoryContent,
  story262 as unknown as StoryContent,
  story263 as unknown as StoryContent,
  story264 as unknown as StoryContent,
  story266 as unknown as StoryContent,
  story267 as unknown as StoryContent,
  story268 as unknown as StoryContent,
  story269 as unknown as StoryContent,
  story270 as unknown as StoryContent,
  story271 as unknown as StoryContent,
  story272 as unknown as StoryContent,
  story273 as unknown as StoryContent,
  story274 as unknown as StoryContent,
  story275 as unknown as StoryContent,
  story276 as unknown as StoryContent,
  story277 as unknown as StoryContent,
  story278 as unknown as StoryContent,
  story279 as unknown as StoryContent,
  story280 as unknown as StoryContent,
  story281 as unknown as StoryContent,
  story282 as unknown as StoryContent,
  story283 as unknown as StoryContent,
  story284 as unknown as StoryContent,
  story285 as unknown as StoryContent,
  story286 as unknown as StoryContent,
  story287 as unknown as StoryContent,
  story288 as unknown as StoryContent,
  story289 as unknown as StoryContent,
  story290 as unknown as StoryContent,
  story291 as unknown as StoryContent,
  story293 as unknown as StoryContent,
  story294 as unknown as StoryContent,
  story295 as unknown as StoryContent,
  story296 as unknown as StoryContent,
  story297 as unknown as StoryContent,
  story298 as unknown as StoryContent,
  story299 as unknown as StoryContent,
  story300 as unknown as StoryContent,
  story301 as unknown as StoryContent,
  story302 as unknown as StoryContent,
  story303 as unknown as StoryContent,
  story304 as unknown as StoryContent,
  story305 as unknown as StoryContent,
  story306 as unknown as StoryContent,
  story307 as unknown as StoryContent,
  story308 as unknown as StoryContent,
  story309 as unknown as StoryContent,
  story310 as unknown as StoryContent,
  story311 as unknown as StoryContent,
  story312 as unknown as StoryContent,
  story313 as unknown as StoryContent,
  story314 as unknown as StoryContent,
  story315 as unknown as StoryContent,
  story316 as unknown as StoryContent,
  story317 as unknown as StoryContent,
  story318 as unknown as StoryContent,
  story319 as unknown as StoryContent,
  story320 as unknown as StoryContent,
  story321 as unknown as StoryContent,
  story322 as unknown as StoryContent,
  story323 as unknown as StoryContent,
  story324 as unknown as StoryContent,
  story325 as unknown as StoryContent,
  story326 as unknown as StoryContent,
  story327 as unknown as StoryContent,
  story328 as unknown as StoryContent,
  story329 as unknown as StoryContent,
  story330 as unknown as StoryContent,
  story331 as unknown as StoryContent,
  story332 as unknown as StoryContent,
  story333 as unknown as StoryContent,
  story334 as unknown as StoryContent,
  story335 as unknown as StoryContent,
  story336 as unknown as StoryContent,
  story337 as unknown as StoryContent,
  story338 as unknown as StoryContent,
  story339 as unknown as StoryContent,
  story340 as unknown as StoryContent,
  story341 as unknown as StoryContent,
  story342 as unknown as StoryContent,
  story343 as unknown as StoryContent,
  story344 as unknown as StoryContent,
  story345 as unknown as StoryContent,
  story346 as unknown as StoryContent,
  story347 as unknown as StoryContent,
  story348 as unknown as StoryContent,
  story349 as unknown as StoryContent,
  story350 as unknown as StoryContent,
  story351 as unknown as StoryContent,
  story352 as unknown as StoryContent,
  story353 as unknown as StoryContent,
  story354 as unknown as StoryContent,
  story355 as unknown as StoryContent,
  story356 as unknown as StoryContent,
  story357 as unknown as StoryContent,
  story358 as unknown as StoryContent,
  story359 as unknown as StoryContent,
  story360 as unknown as StoryContent,
  story361 as unknown as StoryContent,
  story362 as unknown as StoryContent,
  story363 as unknown as StoryContent,
  story364 as unknown as StoryContent,
  story365 as unknown as StoryContent,
  story366 as unknown as StoryContent,
  story367 as unknown as StoryContent,
  story368 as unknown as StoryContent,
  story369 as unknown as StoryContent,
  story370 as unknown as StoryContent,
  story371 as unknown as StoryContent,
  story372 as unknown as StoryContent,
  story373 as unknown as StoryContent,
  story374 as unknown as StoryContent,
  story375 as unknown as StoryContent,
  story376 as unknown as StoryContent,
  story377 as unknown as StoryContent,
  story378 as unknown as StoryContent,
  story379 as unknown as StoryContent,
  story380 as unknown as StoryContent,
  story381 as unknown as StoryContent,
  story382 as unknown as StoryContent,
  story383 as unknown as StoryContent,
  story384 as unknown as StoryContent,
  story385 as unknown as StoryContent,
  story386 as unknown as StoryContent,
  story387 as unknown as StoryContent,
  story388 as unknown as StoryContent,
  story389 as unknown as StoryContent,
  story390 as unknown as StoryContent,
  story391 as unknown as StoryContent,
  story392 as unknown as StoryContent,
  story393 as unknown as StoryContent,
  story394 as unknown as StoryContent,
  story395 as unknown as StoryContent,
  story396 as unknown as StoryContent,
  story397 as unknown as StoryContent,
  story398 as unknown as StoryContent,
  story399 as unknown as StoryContent,
  story400 as unknown as StoryContent,
  story401 as unknown as StoryContent,
  story402 as unknown as StoryContent,
  story403 as unknown as StoryContent,
  story404 as unknown as StoryContent,
  story405 as unknown as StoryContent,
  story406 as unknown as StoryContent,
  story407 as unknown as StoryContent,
  story408 as unknown as StoryContent,
  story409 as unknown as StoryContent,
  story410 as unknown as StoryContent,
  story411 as unknown as StoryContent,
  story412 as unknown as StoryContent,
  story413 as unknown as StoryContent,
  story414 as unknown as StoryContent,
  story415 as unknown as StoryContent,
  story416 as unknown as StoryContent,
  story417 as unknown as StoryContent,
  story418 as unknown as StoryContent,
  story419 as unknown as StoryContent,
  story420 as unknown as StoryContent,
  story421 as unknown as StoryContent,
  story422 as unknown as StoryContent,
  story423 as unknown as StoryContent,
  story424 as unknown as StoryContent,
  story425 as unknown as StoryContent,
  story426 as unknown as StoryContent,
  story427 as unknown as StoryContent,
  story428 as unknown as StoryContent,
  story429 as unknown as StoryContent,
  story430 as unknown as StoryContent,
  story431 as unknown as StoryContent,
  story432 as unknown as StoryContent,
  story433 as unknown as StoryContent,
  story434 as unknown as StoryContent,
  story435 as unknown as StoryContent,
  story436 as unknown as StoryContent,
  story437 as unknown as StoryContent,
  story438 as unknown as StoryContent,
  story439 as unknown as StoryContent,
  story440 as unknown as StoryContent,
  story441 as unknown as StoryContent,
  story442 as unknown as StoryContent,
  story443 as unknown as StoryContent,
  story444 as unknown as StoryContent,
  story445 as unknown as StoryContent,
  story446 as unknown as StoryContent,
  story447 as unknown as StoryContent,
  story448 as unknown as StoryContent,
  story449 as unknown as StoryContent,
  story450 as unknown as StoryContent,
  story451 as unknown as StoryContent,
  story452 as unknown as StoryContent,
  story453 as unknown as StoryContent,
  story454 as unknown as StoryContent,
  story455 as unknown as StoryContent,
  s_furusatoVnTamcam1 as unknown as StoryContent,
  s_furusatoVnTamcam2 as unknown as StoryContent,
  s_furusatoVnTamcam3 as unknown as StoryContent,
  s_furusatoVnSodua1 as unknown as StoryContent,
  s_furusatoVnGiong1 as unknown as StoryContent,
  s_furusatoVnSontinh1 as unknown as StoryContent,
  s_osakaHataraku01 as unknown as StoryContent,
  s_osakaHataraku02 as unknown as StoryContent,
  s_osakaHataraku03 as unknown as StoryContent,
  s_osakaHataraku04 as unknown as StoryContent,
  s_osakaHataraku05 as unknown as StoryContent,
  s_furusatoVnCaytre1 as unknown as StoryContent,
  s_furusatoVnMaiantiem1 as unknown as StoryContent,
  s_furusatoVnThachsanh1 as unknown as StoryContent,
  s_furusatoVnThachsanh2 as unknown as StoryContent,
  s_furusatoVnThachsanh3 as unknown as StoryContent,
  s_furusatoVnKhe1 as unknown as StoryContent,
  s_furusatoVnHoguom1 as unknown as StoryContent,
  s_furusatoVnRongtien1 as unknown as StoryContent,
  s_furusatoVnChudongtu1 as unknown as StoryContent,
  s_furusatoVnTuthuc1 as unknown as StoryContent,
  s_furusatoVnTraucau1 as unknown as StoryContent,
  s_furusatoKrHeungbu1 as unknown as StoryContent,
  s_furusatoKrSimcheong1 as unknown as StoryContent,
  s_furusatoKrOnui1 as unknown as StoryContent,
  s_furusatoKrKongjwi1 as unknown as StoryContent,
  s_furusatoCnNiulang1 as unknown as StoryContent,
  s_furusatoCnBaishe1 as unknown as StoryContent,
  s_furusatoCnChange1 as unknown as StoryContent,
  s_furusatoCnSaiyuki1 as unknown as StoryContent,
  s_furusatoCnSaiyuki2 as unknown as StoryContent,
  s_furusatoCnSaiyuki3 as unknown as StoryContent,
  s_furusatoPhMalakas1 as unknown as StoryContent,
  s_furusatoPhPinya1 as unknown as StoryContent,
  s_furusatoPhPagong1 as unknown as StoryContent,
  s_furusatoPhJuan1 as unknown as StoryContent,
  s_furusatoIdMalin1 as unknown as StoryContent,
  s_furusatoIdTimun1 as unknown as StoryContent,
  s_furusatoIdBawang1 as unknown as StoryContent,
  s_furusatoIdSangkuriang1 as unknown as StoryContent,
  s_furusatoIdKancil1 as unknown as StoryContent,
  s_furusatoThSangthong1 as unknown as StoryContent,
  s_furusatoThAphai1 as unknown as StoryContent,
  s_furusatoNpManjushri1 as unknown as StoryContent,
];

export function getVideo(id: string): VideoContent | undefined {
  return VIDEOS.find((v) => v.id === id);
}

export function getStory(id: string): StoryContent | undefined {
  return STORIES.find((s) => s.id === id);
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
