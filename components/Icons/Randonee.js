import React from "react";

export default function Randonnee({ size = 30, color = "white" }) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      viewBox="0 0 887 1280"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: { size }, height: { size } }}
    >
      <g
        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path
          d="M3820 12741 c-405 -99 -397 -94 -453 -266 -75 -228 -115 -451 -124
-700 -5 -124 -3 -161 11 -209 10 -32 14 -61 11 -65 -4 -3 -50 -6 -103 -7 -79
-1 -109 -6 -163 -27 -145 -56 -178 -94 -263 -313 -132 -338 -420 -1178 -750
-2182 -183 -555 -210 -651 -203 -718 9 -88 146 -352 221 -428 40 -39 133 -85
258 -125 85 -27 143 -39 321 -68 l49 -8 -36 -46 c-121 -159 -217 -428 -237
-664 -17 -207 -9 -309 33 -450 65 -215 73 -300 72 -720 -2 -572 -32 -922 -104
-1200 -36 -138 -140 -450 -213 -640 -77 -202 -103 -316 -147 -649 -42 -318
-89 -594 -116 -674 -23 -67 -36 -89 -95 -162 -79 -98 -204 -292 -261 -407 -57
-113 -69 -176 -48 -253 22 -83 276 -308 424 -376 32 -15 71 -43 94 -69 39 -45
117 -164 111 -170 -14 -13 -236 -115 -251 -115 -10 0 -44 11 -76 24 -86 36
-162 44 -457 51 -148 3 -301 11 -340 17 -39 6 -144 38 -239 75 -318 121 -344
116 -484 -90 -167 -245 -239 -450 -258 -729 -9 -136 -4 -145 103 -186 148 -56
448 -135 658 -173 171 -30 215 -24 1075 146 289 57 591 113 672 125 81 12 180
32 220 46 134 45 199 29 319 -82 41 -37 94 -76 119 -87 67 -30 198 -19 431 37
284 68 317 71 524 46 119 -15 215 -21 301 -18 l126 3 32 35 c18 20 47 72 65
115 152 369 439 901 463 859 3 -5 0 -29 -7 -54 -7 -25 -23 -81 -35 -125 -20
-69 -23 -105 -24 -255 -1 -147 2 -184 18 -229 33 -95 106 -152 296 -233 132
-56 292 -138 397 -205 226 -143 219 -143 694 57 399 169 491 198 846 271 338
69 339 69 337 183 -1 80 -37 223 -114 459 -63 191 -121 311 -204 420 -77 103
-133 200 -142 245 -10 50 9 38 40 -25 36 -74 91 -151 206 -288 188 -225 290
-404 440 -770 146 -355 176 -400 281 -420 72 -13 474 99 635 177 85 41 99 69
91 178 -15 197 -178 855 -257 1042 -55 129 -79 153 -370 371 -248 186 -534
377 -564 377 -42 0 -177 -101 -431 -320 -65 -57 -108 -80 -122 -67 -8 9 16 64
56 127 76 120 334 678 363 783 l12 47 -79 81 c-90 91 -299 263 -370 304 -63
37 -111 31 -290 -36 -108 -40 -153 -52 -195 -52 -64 0 -190 33 -268 70 l-54
26 5 47 c3 26 46 220 96 431 50 211 142 614 206 894 208 919 557 2291 662
2605 33 99 199 655 253 845 52 184 72 225 146 295 105 100 127 192 117 481 -7
216 -6 222 103 579 142 460 156 537 114 606 -30 47 -99 78 -158 70 -54 -7 -85
-33 -117 -96 -23 -47 -90 -246 -145 -435 -39 -133 -121 -341 -155 -395 -32
-51 -89 -79 -173 -87 -113 -9 -123 -17 -216 -166 -77 -122 -158 -127 -268 -15
-81 82 -93 88 -176 88 -52 0 -114 -10 -209 -35 -202 -52 -282 -48 -385 23
-161 108 -267 206 -335 308 -29 45 -97 132 -151 193 -228 262 -262 305 -278
348 -30 79 1 99 173 113 136 10 209 30 253 66 39 34 54 69 70 172 7 46 20 92
29 103 9 10 43 29 76 42 l60 23 6 110 c9 158 28 212 98 289 31 33 40 55 55
125 15 68 25 90 48 112 17 15 36 28 44 28 23 0 54 38 54 65 0 44 -40 107 -115
181 -81 81 -179 143 -289 184 -42 15 -95 40 -120 54 -48 28 -106 91 -106 116
0 8 -21 49 -45 90 -51 83 -52 97 -33 250 11 95 11 96 -16 155 -15 33 -37 71
-49 83 -48 52 -266 144 -564 237 -188 60 -790 235 -801 234 -4 0 -113 -26
-242 -58z m3340 -4350 c5 -11 10 -35 10 -53 0 -57 -55 -304 -140 -624 -45
-170 -132 -505 -195 -744 -160 -611 -203 -764 -289 -1020 -164 -493 -376
-1341 -551 -2200 -30 -146 -61 -283 -68 -305 l-15 -40 -12 45 c-6 25 -17 52
-23 61 -19 25 -68 47 -148 65 -160 36 -175 56 -354 485 l-77 186 167 288 c174
301 237 403 440 720 222 346 360 600 416 765 46 136 33 308 -36 458 -47 102
-61 114 -217 182 -79 34 -343 160 -588 280 -470 231 -657 314 -786 350 -85 24
-154 49 -154 57 0 14 75 150 125 226 31 49 80 139 107 200 27 62 67 154 90
204 68 153 114 194 266 232 107 28 156 26 325 -8 159 -33 271 -47 429 -56 132
-7 168 -19 264 -91 98 -72 128 -84 211 -84 101 0 277 26 325 48 54 24 76 49
129 142 76 136 118 176 239 226 68 29 96 30 110 5z m-2855 -2481 c316 -36 679
-131 783 -206 2 -1 -28 -65 -66 -141 -38 -76 -141 -302 -227 -503 -87 -201
-163 -378 -171 -395 -7 -16 -66 -94 -131 -172 -185 -221 -256 -362 -257 -508
0 -68 4 -88 28 -137 16 -32 59 -90 97 -131 118 -128 222 -196 333 -216 78 -14
138 -61 282 -220 l113 -125 -86 -125 c-47 -69 -95 -137 -107 -149 -38 -42 -98
-70 -296 -137 -107 -37 -207 -73 -222 -81 -52 -27 -53 -33 -56 -409 -2 -192
-6 -353 -10 -357 -4 -4 -68 -26 -142 -48 -149 -46 -208 -75 -236 -117 -10 -15
-56 -98 -102 -183 -99 -185 -227 -380 -248 -380 -8 0 -69 16 -135 35 -66 19
-161 40 -212 46 -108 12 -113 16 -171 125 -66 125 -129 159 -327 179 l-65 6
-33 137 c-19 75 -49 189 -68 252 -34 112 -34 117 -23 190 43 278 232 907 352
1174 28 61 95 223 150 361 120 298 181 422 281 572 88 131 106 174 158 393 41
169 78 271 194 540 37 85 91 220 121 299 89 237 160 347 263 413 51 32 87 34
236 18z"
        />
      </g>
    </svg>
  );
}
