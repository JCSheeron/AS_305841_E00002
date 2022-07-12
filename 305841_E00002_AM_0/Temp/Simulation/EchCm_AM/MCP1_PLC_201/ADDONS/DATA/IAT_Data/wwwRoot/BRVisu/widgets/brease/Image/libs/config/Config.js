define(['brease/enum/Enum'],
    function (Enum) {

        'use strict';

        /**
         * @class widgets.brease.Image.config.Config
         * @extends core.javascript.Object
         * @override widgets.brease.Image
         */

        /**
         * @cfg {ImagePath} image=''
         * @iatStudioExposed
         * @iatCategory Appearance
         * @bindable
         * Path to image file
         */

        /**
         * @cfg {Boolean} useSVGStyling=true
         * @iatStudioExposed
         * @iatCategory Appearance
         * Define if the image stylings (i.e imageColor) are applied - only valid when SVG Images are used.
         */

        /**
         * @cfg {brease.enum.SizeMode} sizeMode='contain'
         * @iatStudioExposed
         * @iatCategory Behavior
         * Size of image relative to widget size
         */

        return {
            image: '',
            useSVGStyling: true,
            sizeMode: Enum.SizeMode.CONTAIN
        };

    });
