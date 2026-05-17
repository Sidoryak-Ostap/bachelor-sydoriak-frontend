import { useGetFieldImages } from '@/hooks/indices/useGetFieldImages';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NDVILegend from './NDVILegend';
import { useGetFieldIndices } from '@/hooks/indices/useGetFieldIndices';
import { formattedShortDate } from '@/utils/format';
import AreaDistribution from './AreaDistribution';
import { useTranslation } from 'react-i18next';

const TimeLine = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';

  const { id: fieldId } = useParams();
  const {
    data: fieldImagesData,
    isError: isImagesError,
    error: imagesError,
  } = useGetFieldImages(fieldId!);

  const {
    data: fieldIndicesData,
    isError: isIndicesError,
    error: indicesError,
  } = useGetFieldIndices(fieldId!);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isImagesError) {
      toast.error(imagesError?.message || 'Failed to fetch field images');
    }
  }, [fieldImagesData, isImagesError, imagesError]);

  useEffect(() => {
    if (isIndicesError) {
      toast.error(indicesError?.message || 'Failed to fetch field indices');
    }
  }, [fieldIndicesData, isIndicesError, indicesError]);

  useEffect(() => {
    if (fieldImagesData?.length && currentIndex >= fieldImagesData.length) {
      setCurrentIndex(0);
    }
  }, [fieldImagesData, currentIndex]);

  const currentImage = fieldImagesData?.[currentIndex];

  const totalImages = fieldImagesData?.length || 0;
  const currentNDVI = fieldIndicesData?.find(index => index.date === currentImage?.date)?.ndvi;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {t('dashboard.fieldDetails.ndviTimeline.title')}
      </h2>
      <p className="text-gray-500 mb-6">{t('dashboard.fieldDetails.ndviTimeline.description')}</p>

      {fieldImagesData?.length ? (
        <div className="flex items-start gap-6">
          <div className="flex-2/3 space-y-4">
            {/* Main Image Display */}
            <div className="border rounded-lg overflow-hidden">
              <div className="relative bg-gray-100">
                <img
                  src={currentImage?.cloudinaryUrl}
                  alt={`Field image  ${new Date(currentImage?.date || '').toLocaleDateString()}`}
                  className="w-full h-auto max-h-80 object-contain scale-75"
                />

                <div className="absolute bottom-4 right-4 z-10">
                  <NDVILegend />
                </div>

                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                    <p className="text-sm font-medium ">
                      {t('dashboard.fieldDetails.ndviTimeline.meanNdvi')} (
                      {currentImage?.date ? formattedShortDate(currentImage.date, language) : 'N/A'}
                      )
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {currentNDVI?.mean !== undefined ? currentNDVI.mean.toFixed(2) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-600 mb-2">
                  {t('dashboard.fieldDetails.ndviTimeline.capturedOn')}{' '}
                  {new Date(currentImage?.date || '').toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  {t('dashboard.fieldDetails.ndviTimeline.image')} {currentIndex + 1}{' '}
                  {t('dashboard.fieldDetails.ndviTimeline.of')} {totalImages}
                </p>
              </div>
            </div>

            {/* Date Timeline */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {fieldImagesData.map((image, index) => (
                <button
                  key={image.date}
                  onClick={() => setCurrentIndex(index)}
                  className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    index === currentIndex
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {new Date(image.date).toLocaleDateString()}
                </button>
              ))}
            </div>
          </div>
          {currentImage?.distribution && (
            <div className="flex-1/3">
              <AreaDistribution currentDistributionData={currentImage?.distribution} />
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">
          {language === 'en'
            ? 'No images available for this field.'
            : 'Немає доступних зображень для цього поля.'}
        </p>
      )}
    </div>
  );
};

export default TimeLine;
